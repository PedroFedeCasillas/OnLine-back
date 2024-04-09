import {
    BadRequestException,
    InternalServerErrorException,
  } from '@nestjs/common';
  
  const errorsDict = {
    11000: (error) => {
      throw new BadRequestException(
        'Entity already exists' + JSON.stringify(error.keyValue),
      );
    },
  };
  
  export const mongoExceptionHandler = (error: any) => {
    if (errorsDict.hasOwnProperty(error.code)) {
      errorsDict[error.code](error);
    }
    throw new InternalServerErrorException(
      'Error processing request' + JSON.stringify(error),
    );
  };