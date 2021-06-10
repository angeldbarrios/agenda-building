class PublicError extends Error {
	public status: string | number;

  constructor(message: string, status: string | number) {
    super(message);
    this.status = status;
  }
}

export {
  PublicError
}