const admin = require("./../dao/Admin");
const util = require("./../../utils/util");
class AdminController {
  async login(req, res) {
    let _ = req.body;
    let result = await admin.login(_.email, _.pass);
    let token = util.generateToken();

    if (result.length > 0) {
      let antiguotoken = result[0].token;
      await admin.updateToken(token, antiguotoken);
      let casero = result[0];
      casero.token = token;
      res.send({ success: true, message: "Successfully !!", data: result });
    } else {
      res.send({ success: false, message: "Invalid User" });
    }
  }

  async mercadoid(req, res) {
    let _ = req.body;
    let result = await admin.validar_token(_.token);
    if (result.length > 0) {
      let resultado = await admin.mercadoid(_.id_mercado);
      for (const element of resultado) {
        let actuale = element["actual"];
        let aforoe = element["aforo"];
        let color;
        if (actuale < aforoe / 4) {
          color = 0;
        } else if (actuale < aforoe / 2) {
          color = 1;
        } else {
          color = 2;
        }
        element["color"] = color;
      }

      res.send({ success: true, message: "succesfully !!", data: resultado });
    } else {
      res.send({ success: false, message: "bad request !!" });
    }
  }
  async GenerarLinkPago(req, res) {
    let _ = req.body;
    let data = `{
        "publicMerchantId": "1",
        "merchantName": "seguro mas",
        "paymentConfig": {
          "paymentType": "unique",
          "amount": {
            "subtotalIva0": 17,
            "currency": "PEN",
            "iva": 5,
            "subtotalIva": 0
          },
          "paymentMethod": [
            "cash",
            "credit-card"
          ]
        },
        "formConfig": [
          {
            "split": false,
            "name": "nombresyapellidos",
            "disabled": false,
            "label": "Nombres y apellidos",
            "placeholder": "Nombres y apellidos",
            "type": "input",
            "required": true
          },
          {
            "split": true,
            "name": "documentodeid",
            "disabled": false,
            "label": "Documento de Id.",
            "placeholder": "Documento de Id.",
            "type": "input",
            "required": false
          },
          {
            "split": true,
            "name": "email",
            "disabled": false,
            "label": "E-mail",
            "placeholder": "E-mail",
            "type": "input",
            "required": false
          }
        ],
        "generalConfig": {
          "productName": "Seguro contra accidentes aéreos",
          "description": " <ul> <li>  servicio express</li><li> Ticket de ingreso</li><li> Atencion post-servicio</li></ul>",
          "productImage": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqrIPXlMmwvIuNIKI92-E9Fy3lowTIsJ-4Jw&usqp=CAU",
          "brandLogo": "https://www.red-salud.com/assets/images/logo.png",
          "executionLimit": 0,
          "showTimer": false,
          "enabled": true,
          "buyButtonText": "Pagar"
        },
        "styleAndStructure": {
          "structure": "checkout",
          "primaryColor": "#00397F",
          "secondaryColor": "#ca0fea"
        },
        "contact": {
          "email": "soporte@red-salud.com",
          "phoneNumber": "987654321"
        }
      }`;
    // console.log(data);

    //Load the request module
    var request = require("request");
    //Lets configure and request
    request(
      {
        url: "https://api-uat.kushkipagos.com/smartlink/v2/smart-link", //URL to hit//Query string data
        method: "POST", // specify the request type
        headers: {
          // speciyfy the headers
          "Content-Type": "MyContentType",
          "Custom-Header": "Custom Value",
          "Private-Merchant-Id": "8431e15c72d943ccb3eebf3ded910acc",
        },
        body: data, //Set the body as a string
      },
      function (error, response, body) {
        if (error) {
          console.log(error);
          res.send({ success: false, message: "bad request !!" });
        } else {
          console.log(response.statusCode, body);
          res.send({
            success: true,
            message: "succesfully !!",
            data: body,
          });
        }
      }
    );
  }
}
module.exports = new AdminController();
