import {LoginUser, RegisterUser, UpdateUserPayload, User} from "@models/user.model";

export class AuthAction {
  static readonly type = '[Auth] Add item';

  constructor(public payload: string) {
  }
}

export class LoginSubmitted {
  static readonly type = '[Auth] Login submitted'

  constructor(public payload: LoginUser) {
  }
}

export class LoginError {
  static readonly type = '[Auth] Login error'

  constructor(public errors: any) {
  }
}

export class UpdateUser {
  static readonly type = '[Auth] UpdateUser'

  constructor(public payload: UpdateUserPayload) {
  }
}

export class Logout {
  static readonly type = '[Auth] Logout'

  constructor() {
  }
}

export class LoginSuccessful {
  static readonly type = '[Auth] Login successful'

  constructor(public user: User) {
  }
}

export class RegisterSubmitted {
  static readonly type = '[Auth] Register submitted'

  constructor(public payload: RegisterUser) {
  }

}

export class RegisterSuccessful {
  static readonly type = '[Auth] Register successful';

  constructor(public user: User) {
  }

}

export class InitAuth {
  static readonly type = '[Auth] Init auth';

  constructor() {
  }
}

export class AuthFailed {
  static readonly type = '[Auth] Auth has failed';

  constructor() {
  }
}

export class AuthenticatedUser {
  static readonly type = '[Auth] Authenticate user';

  constructor(public token: string) {
  }
}

export class IsAuthenticatedUser {
  static readonly type = '[Auth] user is authenticated';

  constructor() {
  }
}
