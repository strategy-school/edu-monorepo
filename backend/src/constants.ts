import config from './config';

export const REGEX_PASSWORD = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d][ -~]{8,}$/;

export default {
  EMAIL_VERIFICATION: (token: string, name: string) => {
    return `<div style="height:100%;width:100%;font-size:14px;font-weight:400;line-height:20px;text-transform:initial;letter-spacing:initial;color:#202223;font-family:-apple-system,BlinkMacSystemFont,San Francisco,Segoe UI,Roboto,Helvetica Neue,sans-serif;margin:0;padding:0">
      <table style="width:100%;border-collapse:collapse;border-spacing:0;margin-top:0;margin-bottom:0;padding:0"><tbody><tr style="margin-top:0;margin-bottom:0;padding:0">
        <td style="margin-top:0;margin-bottom:0;padding:0;border-width:0"></td>
        <td style="margin-top:0;margin-bottom:0;width:470px;padding:0;border-width:0"><table style="width:100%;border-collapse:initial;border-spacing:0;max-width:470px;text-align:left;border-radius:8px;overflow:hidden;margin:32px auto 0;padding:0;border:1px solid #c9cccf"><tbody><tr style="margin-top:0;margin-bottom:0;padding:0"><td style="margin-top:0;margin-bottom:0;padding:0;border-width:0"><table class="m_67968070139110097mail-sections" style="width:100%;border-collapse:collapse;border-spacing:0;margin-top:0;margin-bottom:0;padding:0"><tbody><tr style="margin-top:0;margin-bottom:0;padding:0"><td style="margin-top:0;margin-bottom:0;padding:20px;border-width:0">
          <table style="width:100%;border-collapse:collapse;border-spacing:0;margin-top:0;margin-bottom:0;padding:0"><tbody><tr style="margin-top:0;margin-bottom:0;padding:0"><td style="margin-top:0;margin-bottom:0;padding:0 0 20px;border-width:0"><table style="width:100%;border-collapse:collapse;border-spacing:0;margin-top:0;margin-bottom:0;padding:0"><tbody>
          <tr style="margin-top:0;margin-bottom:0;padding:0"><td style="margin-top:0;margin-bottom:0;padding:0;border-width:0"><h1 style="margin-top:0;margin-bottom:0;font-size:16px;font-weight:600;line-height:24px;text-transform:initial;letter-spacing:initial;padding:0">
            Здравствуйте, ${name}
          </h1></td></tr>
          <tr style="margin-top:0;margin-bottom:0;padding:0"><td style="margin-top:0;margin-bottom:0;padding:16px 0 0;border-width:0"><h2 style="margin-top:0;margin-bottom:0;font-size:15px;font-weight:400;line-height:20px;text-transform:initial;letter-spacing:initial;padding:0">
            Вы зарегистрировали аккаунт на Strategy School. Прежде чем начать пользоваться своей учетной записью, Вам необходимо подтвердить, что это Ваш адрес электронной почты, нажав на кнопку:
          </h2></td></tr>
          <tr style="margin-top:0;margin-bottom:0;padding:0"><td style="margin-top:0;margin-bottom:0;padding:16px 0 0;border-width:0"><a rel="noopener noreferrer" href="${config.appUrl}/verify-email/${token}" style="margin-top:0;margin-bottom:0;color:white;text-decoration:none;display:inline-block;font-size:16px;font-weight:400;line-height:24px;text-transform:initial;letter-spacing:initial;background-color:#008060;border-radius:4px;padding:0;border-color:#008060;border-style:solid;border-width:10px 20px" target="_blank">Подтвердить email</a></td></tr>
          </tbody></table></td></tr></tbody></table>
        </td></tr></tbody></table></td></tr></tbody></table></td>
        <td style="margin-top:0;margin-bottom:0;padding:0;border-width:0"></td>
      </tr>
        </tbody>
      </table>
    </div>`;
  },
  EMAIL_NEW_VERIFICATION: (
    token: string,
    name: string,
    email: string,
    newEmail: string,
  ) => {
    return `<div style="height:100%;width:100%;font-size:14px;font-weight:400;line-height:20px;text-transform:initial;letter-spacing:initial;color:#202223;font-family:-apple-system,BlinkMacSystemFont,San Francisco,Segoe UI,Roboto,Helvetica Neue,sans-serif;margin:0;padding:0">
      <table style="width:100%;border-collapse:collapse;border-spacing:0;margin-top:0;margin-bottom:0;padding:0"><tbody><tr style="margin-top:0;margin-bottom:0;padding:0">
        <td style="margin-top:0;margin-bottom:0;padding:0;border-width:0"></td>
        <td style="margin-top:0;margin-bottom:0;width:470px;padding:0;border-width:0"><table style="width:100%;border-collapse:initial;border-spacing:0;max-width:470px;text-align:left;border-radius:8px;overflow:hidden;margin:32px auto 0;padding:0;border:1px solid #c9cccf"><tbody><tr style="margin-top:0;margin-bottom:0;padding:0"><td style="margin-top:0;margin-bottom:0;padding:0;border-width:0"><table class="m_67968070139110097mail-sections" style="width:100%;border-collapse:collapse;border-spacing:0;margin-top:0;margin-bottom:0;padding:0"><tbody><tr style="margin-top:0;margin-bottom:0;padding:0"><td style="margin-top:0;margin-bottom:0;padding:20px;border-width:0">
          <table style="width:100%;border-collapse:collapse;border-spacing:0;margin-top:0;margin-bottom:0;padding:0"><tbody><tr style="margin-top:0;margin-bottom:0;padding:0"><td style="margin-top:0;margin-bottom:0;padding:0 0 20px;border-width:0"><table style="width:100%;border-collapse:collapse;border-spacing:0;margin-top:0;margin-bottom:0;padding:0"><tbody>
          <tr style="margin-top:0;margin-bottom:0;padding:0"><td style="margin-top:0;margin-bottom:0;padding:0;border-width:0"><h1 style="margin-top:0;margin-bottom:0;font-size:16px;font-weight:600;line-height:24px;text-transform:initial;letter-spacing:initial;padding:0">
            Здравствуйте, ${name}
          </h1></td></tr>
          <tr style="margin-top:0;margin-bottom:0;padding:0"><td style="margin-top:0;margin-bottom:0;padding:16px 0 0;border-width:0"><h2 style="margin-top:0;margin-bottom:0;font-size:15px;font-weight:400;line-height:20px;text-transform:initial;letter-spacing:initial;padding:0">
            Вы поменяли свою электронную почту с ${email} на ${newEmail}. Для сохранения новой электронной почты и использования её на сайте ${config.companyName}, Вам необходимо подтвердить, что это Ваш адрес электронной почты, нажав на кнопку:
          </h2></td></tr>
          <tr style="margin-top:0;margin-bottom:0;padding:0"><td style="margin-top:0;margin-bottom:0;padding:16px 0 0;border-width:0"><h2 style="margin-top:0;margin-bottom:0;font-size:15px;font-weight:400;line-height:20px;text-transform:initial;letter-spacing:initial;padding:0">
            Если вы не отправляли запрос на изменение электронной почты, то проигнорируйте это сообщение.
          </h2></td></tr>
          <tr style="margin-top:0;margin-bottom:0;padding:0"><td style="margin-top:0;margin-bottom:0;padding:16px 0 0;border-width:0"><a rel="noopener noreferrer" href="${config.appUrl}/verify-email/${token}" style="margin-top:0;margin-bottom:0;color:white;text-decoration:none;display:inline-block;font-size:16px;font-weight:400;line-height:24px;text-transform:initial;letter-spacing:initial;background-color:#008060;border-radius:4px;padding:0;border-color:#008060;border-style:solid;border-width:10px 20px" target="_blank">Подтвердить email</a></td></tr>
          </tbody></table></td></tr></tbody></table>
        </td></tr></tbody></table></td></tr></tbody></table></td>
        <td style="margin-top:0;margin-bottom:0;padding:0;border-width:0"></td>
      </tr>
        </tbody>
      </table>
    </div>`;
  },
  EMAIL_FORGOT_PASS: (firstName: string, token: string) => {
    return ` <div style="font-family: Arial, sans-serif; font-size: 14px;">
      <p>Дорогой/ая ${firstName},</p>
      <p>Команда Strategia School получила ваш запрос на сброс пароля. Пройдите по нижеуказанной ссылке для сброса пароля.</p>
       <p><a href="${config.appUrl}/reset-password/${token}" target="_blank" rel="noopener noreferrer">${config.appUrl}/reset-password/${token}</a></p>
      <p>Если вы не отправляли вышеуказанный запрос, пожалуйста, проигнорируйте это сообщение.</p>
      <p style="margin-top: 20px">С уважением,</p>
      <p style="font-weight: bold">Команда Strategia School</p>
    </div> `;
  },
};
