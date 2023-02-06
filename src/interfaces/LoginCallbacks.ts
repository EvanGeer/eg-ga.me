import { User } from "./User";

export interface LoginCallbacks {
  onLogIn: (user: User | null | undefined) => void;
  onLogOut?: () => void;
}
