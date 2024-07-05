import { Body, Controller, Get, HttpStatus, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JsonFileOperationService } from 'src/services/json-file-operation.service';
import { AuthGuard } from 'src/user/guards/auth.guard';
import { FileOperationService } from './file-operation.service';
import { storage } from './file.middleware';

@Controller('file-operation')
export class FileOperationController {
  constructor(
    private readonly fileOperationService: FileOperationService,
    private readonly jsonFileOpService: JsonFileOperationService
  ) { }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file', storage))
  async uploadFile(@UploadedFile() file) {
    try {
      const fileSizeInBytes = file.size;
      const fileSizeInKilobytes = fileSizeInBytes / 1024;
      const fileSizeInMegabytes = fileSizeInKilobytes / 1024;
      const res = {
        filename: file.filename,
        size: {
          bytes: fileSizeInBytes,
          kilobytes: fileSizeInKilobytes.toFixed(2),
          megabytes: fileSizeInMegabytes.toFixed(2),
        },
        file
      };
      await this.jsonFileOpService.writeIntoJson([res], "file-details")
      return res
    } catch (error) {
      throw error;
    }
  }

  @Get("raw")
  @UseGuards(AuthGuard)
  async getRawData() {
    return await this.jsonFileOpService.readFileData("raw-data")
  }

  @Get("status")
  @UseGuards(AuthGuard)
  async getStatus() {
    return await this.jsonFileOpService.readFileData("json-update")
  }

  @Get()
  @UseGuards(AuthGuard)
  getFileData() {
    return this.jsonFileOpService.readFileData("file-details")
  }

  @Post("file-data")
  @UseGuards(AuthGuard)
  async updateData(@Body() body) {
    try {
      await this.jsonFileOpService.writeIntoJson([body], "json-update")
      return { status: HttpStatus.OK, message: "Updated", time: new Date().getTime() }
    } catch {
      throw new Error("failed")
    }
  }

  @Post("raw-data")
  @UseGuards(AuthGuard)
  async updateRawData(@Body() body) {
    try {
      await this.jsonFileOpService.writeIntoJson([body], "raw-data")
      return { status: HttpStatus.OK, message: "Updated", time: new Date().getTime() }
    } catch {
      throw new Error("failed")
    }
  }

  @Post()
  @UseGuards(AuthGuard)
  writeFileData(@Body() body) {
    return this.jsonFileOpService.writeIntoJson(body.data, "file-details")
  }

}
