import { HttpError } from "http-errors";
import cls from "continuation-local-storage";
import winston, { transports, format } from "winston";
const { combine, printf, json } = format;
const timer = format.timestamp;
export class LogHandler {
  private logger!: winston.Logger;
  private logForamt!: winston.Logform.Format;
  constructor(level: string = "info") {
    this.initLogger(level);
  }

  private initLogger(leveltType: string) {

    this.logForamt = printf(({ level, message, timestamp, stack }) => {
      const logMessage = this.constructLogMessage(level, timestamp, stack, message);
      return logMessage;
    })

    this.buildLoggerByEnvType(leveltType);
  }

  private constructLogMessage(level: string, timestamp: any, stack: any, message: string) {
    const apiRequest = cls.getNamespace("apiRequest");
    const transactionId = apiRequest?.get('transactionId');
    const logMessage = transactionId ? `${level} : ${transactionId} - ${timestamp} -> ${stack || message}` : `${level} - ${timestamp} -> ${stack || message}`;
    return logMessage;
  }

  private buildLoggerByEnvType(level: string) {
    if (process.env.NODE_ENV === 'development') {
      this.logger = this.buildDevLogger(level);
    } else {
      this.logger = this.buildProdLogger(level);
    }
  }

  private buildDevLogger(level: string) {
    return winston.createLogger({
      level,
      format: combine(
        timer({ format: "DD-MM-YYYY HH:mm:ss" }),
        format.errors({ stack: true }),
        this.logForamt
      ),
      transports: [
        new transports.File({ filename: "logs/dev-debug.log", options: { flags: 'w' } })
      ]
    });
  }
  private buildProdLogger(level: string) {
    return winston.createLogger({
      level,
      format: combine(
        timer(),
        format.errors({ stack: true }),
        this.logForamt,
        json()
      ),
      transports: [
        new transports.File({ filename: "logs/prod-debug.log", level: 'error', options: { flags: 'w' } })
      ]
    });
  }

  public logAsError(error: HttpError) {
    if (process.env.NODE_ENV === 'development') {
      this.logger.error(error.stack)
    } else {
      this.logger.error({ status: error.status, message: error.message });
    }
  }
  public logAsWarning(message: string) {
    this.logger.warn(message)
  }
  public logAsInfo(message: string) {
    this.logger.info(message)
  }
  public logAsDebug(message: string) {
    this.logger.debug(message)
  }
}

export const logger = new LogHandler();