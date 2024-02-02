
export function isEmail(string){
    return string.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
}

export function isValidPassword(string){
    return string.match(
        /^.{6,}$/
    );
}

