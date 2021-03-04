import { AuthenticatorFunc } from "../type-defs";

export class Authenticators {
  public get locked(): boolean {
    return this._locked;
  }
  private authenticators: Record<string, AuthenticatorFunc> = {};

  private _locked: boolean = false;

  public lock(): void {
    this._locked = true;
  }

  public add(authTokenName: string, authenticator: AuthenticatorFunc) {
    if (this._locked) {
      throw new Error("Api is locked and cannot be updated");
    }

    this.authenticators[authTokenName] = authenticator;
  }

  public validateAuthenticators(authTokenNames: string[]): string[] {
    const errors: string[] = [];
    for (const tokenName of authTokenNames) {
      const authenticator = this.authenticators[tokenName];
      if (!authenticator) {
        errors.push(`${tokenName} has no handler registered`);
      }
    }

    return errors;
  }

  public get(authTokenName: string): AuthenticatorFunc {
    const authenticator = this.authenticators[authTokenName];
    if (authenticator) {
      return authenticator;
    }

    throw new Error("Auth token not supported");
  }
}