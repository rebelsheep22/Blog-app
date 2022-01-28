export class Alert {
  id?: string;
  type?: AlertType;
  message?: any;
  autoClose?: boolean;
  keepAfterRouteChange?: boolean;
  fade?: boolean;

  constructor(init?:Partial<Alert>) {
      Object.assign(this, init);
  }
}

export enum AlertType {
  Success,
  Error,
  Info,
  Warning
}
