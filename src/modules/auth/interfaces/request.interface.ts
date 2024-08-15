export interface RequestInterface extends Request {
    user: {
      role: 'user' | 'admin'
    }
  }