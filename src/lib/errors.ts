export class AppError extends Error {
   constructor(message: string) {
      super(message);
      this.name = "AppError";
   }
}

export class ForbiddenError extends AppError {
   constructor(message = "Forbidden") {
      super(message);
      this.name = "ForbiddenError";
   }
}

export class UnauthorizedError extends AppError {
   constructor(message = "Unauthorized") {
      super(message);
      this.name = "UnauthorizedError";
   }
}

export class NotFoundError extends AppError {
   constructor(message = "Not Found") {
      super(message);
      this.name = "NotFoundError";
   }
}
