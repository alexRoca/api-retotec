import { readFileSync } from 'fs';
import { join } from 'path';

export class SwaggerService {
  private filePath: string;

  constructor() {
    this.filePath = join(__dirname, '../openapi.yaml');
  }

  public getSwaggerDocumentation(): string {
    try {
      return readFileSync(this.filePath, 'utf-8');
    } catch (error) {
      console.error('Error reading Swagger file:', error);
      throw new Error('Error reading Swagger file');
    }
  }
}
