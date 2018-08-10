
export class Cookie {
      public key: string;
      public value: string;
      public expires?: string|Date;
      public maxAge?: number;
      public path?:string;
      public domain?:string;
      public secure?:boolean;
      public httpOnly?: boolean;
 }
