import * as jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'secret';

type Payload = {
  id: number;
  email: string;
};

export default class JWT {
  static create(payload: Payload): string {
    const data = jwt.sign(payload, secret);
    return data;
  }

  static verify(token: string): string | object {
    const verify = token.split(' ')[1];
    const data = jwt.verify(verify, secret) as Payload;
    return data;
  }
}
