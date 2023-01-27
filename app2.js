(new URL(window.location.href)).searchParams.forEach((x, y) =>
			document.getElementById(y).value = x)
		function genCfg() {
			let results = document.getElementById('results');
			results.setAttribute("style", "");
			let kp = wireguard.generateKeypair();
			/* let psk = wireguard.generatePresharedKey(); */
			let fd = new FormData(document.getElementById('params'));

            let mikrotikCommand = "/interface wireguard peers\n" +
            "add allowed-address=" + fd.get("ca") + "/32" + " interface=wireguard1 public-key=" + "\"" + kp.publicKey + "\"";
			
            let clientcfg = [
                "# PrivateKey = "+kp.privateKey,
                "# PublicKey = "+kp.publicKey,
                "",
				"[Interface]",
				"PrivateKey = "+kp.privateKey,
				"Address = "+fd.get("ca")+"/32",
                "",
				"[Peer]",
				"Endpoint = "+fd.get("sa")+":"+fd.get("sp"),
				"PublicKey = "+fd.get("sk"),
				/* "PresharedKey = "+psk, */
				"AllowedIPs = "+fd.get("aa"),
				(fd.get("ka") > 0)? ("PersistentKeepalive = "+fd.get("ka")) : ""].join("\n");
                let client_dl = document.getElementById('client-dl');
                client_dl.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(clientcfg));
                client_dl.setAttribute('download', fd.get('cn') + "-client.conf");

            let clientcfgHtml = clientcfg.replace(/\n/g, '<br>');
            document.getElementById('client-config').innerHTML = clientcfgHtml;
            document.getElementById('client-dl').classList.add('button-generated');
            document.getElementById('mikrotik-command').innerHTML = mikrotikCommand;

            
    

            
            
            function createQRCode(fileContent) {
                var qrc = new QRCode(document.getElementById("qrcode"), fileContent);
              }
            
               // Elimina el contenido del elemento HTML que muestra el código QR
               document.getElementById("qrcode").innerHTML = "";

             // Llamamos a la función y le pasamos como parámetro el contenido del archivo
            createQRCode(clientcfg);
 
            
            window.addEventListener("load", () => {
              // Crea una nueva instancia de QRCode y proporciona el elemento HTML en el que se mostrará el código QR
              // y el contenido que se quiere mostrar en el código QR
              var qrc = new QRCode(document.getElementById("qrcode"), "client-config");
            });
          
       
              window.addEventListener("load", () => {
              


                // Obtiene el contenido del archivo de configuración
                var config = document.getElementById("client-config").innerHTML;
    
                // Crea una nueva instancia de QRCode y proporciona el elemento HTML en el que se mostrará el código QR
                // y el contenido que se quiere mostrar en el código QR (el contenido del archivo de configuración)
                var qrc = new QRCode(document.getElementById("qrcode"), config);
              });
              

              
		}
       
   
     /*    function configmkt() {
        
            let clientcfg = [
                "/interface wireguard peers",
               "add allowed-address=" + fd.get("ca") + "/32" + " interface=wireguard1 public-key=" + "\"" + kp.publicKey + "\"",
               "",
        } */

		document.getElementById('genbtn').onclick = genCfg;
        
  
