import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export const matchpassword : ValidatorFn=(control:AbstractControl):ValidationErrors|null =>
{
    let Password=control.get('Password');
    let confirmPassword=control.get('ConfirmPassword')

    if(Password && confirmPassword &&   Password?.value != confirmPassword?.value)
    {
        return {PasswordMatchError:true}
    }

return null;
}