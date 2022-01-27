/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { UserService } from 'src/modules/user/user.service';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
        ) { }

    async validateUser(userEmail: string, userPassword: string) {
        const user = await this.userService.findByEmail(userEmail);

        const checkPass = bcrypt.compareSync(userPassword, user.password);

        if (user && checkPass) {
            const { id_user, name, email } = user;
            return { id_user, name, email };
        }

        return null;
    }


    async login(user:any){
        const payload = {
            sub: user.id_user,
            name: user.name,
            email: user.email,
        }
        return {
            access_token: this.jwtService.sign(payload),
        }
    }
}
