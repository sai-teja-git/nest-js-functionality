import { HttpStatus, Injectable } from "@nestjs/common";
import * as fs from "fs";

@Injectable()

export class JsonFileOperationService {

    private returnPath(name = "") {
        return `./json-files/${name}.json`;
    }

    async writeIntoJson(data: any[], name = "") {
        if (!name) {
            throw new Error("no name for file")
        }
        if (data.length) {
            const path = this.returnPath(name)
            if (!fs.existsSync(path)) {
                await fs.appendFileSync(path, JSON.stringify([]), "utf8")
            }
            let fileData: any = await this.readFileData(name)
            await fs.writeFileSync(path, JSON.stringify([...(fileData?.data ?? []), ...data]), "utf8")
            return { status: HttpStatus.OK, message: "File Updated" }
        }
    }

    async readFileData(name = "") {
        if (!name) {
            throw new Error("no name for file")
        }
        const path = this.returnPath(name)
        let data: any[] = JSON.parse(await fs.readFileSync(path, "utf8"))
        return { status: HttpStatus.OK, message: "File Data Fetched", data }
    }

}