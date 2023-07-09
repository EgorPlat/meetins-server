import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {

    getUsers(): string {
        return `
            <p>Hello world from GET REQUEST</p>
        `
    }
    sendUsers(): string {
        return `
            <p>Hello world from POST REQUEST</p>
        `
    }
    headUsers(): string {
        return `
            <p>Hello world from HEAD REQUEST</p>
        `
    }
}