import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-github2';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
  constructor(private readonly configService: ConfigService) {
    super({
      clientID: configService.get<string>('GITHUB_CLIENT_ID'),
      clientSecret: configService.get<string>('GITHUB_CLIENT_SECRET'),
      callbackURL: configService.get<string>('GITHUB_CALLBACK_URL'),
      scope: ['user:email'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: Function,
  ): Promise<any> {
    const { id, username, _displayName, emails, photos } = profile;
    
    const user = {
        id,
        email: emails && emails.length > 0 ? emails[0].value : `${username}@github.example.com`,
        displayName: _displayName || username,
        username,
        picture: photos && photos.length > 0 ? photos[0].value : null,
        accessToken,
    };
    
    done(null, user);
  }
}
