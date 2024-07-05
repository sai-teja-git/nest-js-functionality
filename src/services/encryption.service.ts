import { Injectable } from '@nestjs/common';


@Injectable()

export class EncryptionService {

    // encryptData() {
    //     const cipher = createCipheriv('aes-256-ctr', key, iv);
    //     const encryptedText = Buffer.concat([
    //         cipher.update(textToEncrypt),
    //         cipher.final(),
    //     ]);
    // }

    encryptData(data: any) {
        return Buffer.from(JSON.stringify(data)).toString("base64")
    }

    decryptData(data: string) {
        return JSON.parse(Buffer.from(data, "base64") as any)
    }

}