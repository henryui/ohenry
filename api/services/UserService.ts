import schema, {
  IUser,
  ExternalProvider,
  UserLanguage,
} from '../loader/schema';

const { User } = schema;

const LIMIT = 20;

export type GoogleUserProfile = {
  provider: ExternalProvider;
  sub: string;
  id: string;
  displayName: string;
  name: { givenName: string; familyName: string };
  given_name: string;
  family_name: string;
  email_verified?: boolean;
  verified?: boolean;
  language: UserLanguage;
  locale?: any;
  email: string;
  emails?: { value: string; type: string }[];
  photos?: {
    value: string;
    type: string;
  }[];
  picture?: string;
  _raw?: string;
  _json?: any;
};

export type LeanUser = IUser & { id: string };

class UserService {
  // # StartRegion Private
  private checkAndParseGoogleUser(profile: GoogleUserProfile) {
    if (!profile) throw new Error('No google profile given.');

    const {
      provider,
      id,
      displayName,
      name: { givenName, familyName } = {},
      language,
      email,
      picture,
    } = profile;

    if (!provider || !id || !email || !givenName || !familyName) {
      throw new Error('Required field not provided from google oauth.');
    }

    const userObj: Omit<IUser, '_id' | 'createdAt' | 'updatedAt'> = {
      providerType: provider,
      externalId: id,
      displayName: displayName || `${givenName} ${familyName}`,
      firstName: givenName,
      lastName: familyName,
      email,
    };
    if (language) userObj.language = language;
    if (picture) userObj.picture = picture;
    return userObj;
  }

  // # StartRegion Public
  public async createFromOAuth(profile: GoogleUserProfile) {
    const existing = await this.findByEmail(profile.email);
    if (existing) return existing;

    const userObj = this.checkAndParseGoogleUser(profile);
    await User.create(userObj);
    return this.findByEmail(userObj.email);
  }

  public async findByEmail(email: string) {
    if (!email) return null;
    return User.findOne({ email }).lean<LeanUser>({
      virtuals: true,
      getters: true,
    });
  }

  public async findById(id: string) {
    if (!id) return null;
    return User.findById(id).lean<LeanUser>({ virtuals: true, getters: true });
  }
}

export default new UserService();
