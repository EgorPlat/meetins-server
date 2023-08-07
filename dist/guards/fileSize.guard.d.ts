import { CanActivate, ExecutionContext } from "@nestjs/common";
import { Observable } from "rxjs";
export declare class FileSizeGuard implements CanActivate {
    private readonly maxTotalSize;
    constructor(maxTotalSize: number);
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean>;
}
