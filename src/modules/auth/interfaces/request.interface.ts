export interface RequestInterface extends Request {
    user: {
      role: 'guest' | 'user' | 'admin'
    }
}