class PublicError extends Error {
  public status: number;
  
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

export { 
  PublicError 
}