var bloques = new Array();
var lotes 	= new Array();
var lienas 	= new Array();
var nPalmas;

document.addEventListener('deviceready', onDeviceReady, true);


function onDeviceReady(){
	var db = window.sqlitePlugin.openDatabase({name: "palmasoftMovil.db"});


	db.executeSql("pragma table_info (TblRowData);", [], function(res) {
		if(res.rows.length == 0){
			db.transaction(function(tx){
				tx.executeSql('DROP TABLE IF EXISTS usuarios');
				tx.executeSql('CREATE TABLE usuarios(`cod_usuario` INTEGER NOT NULL PRIMARY KEY, `login` varchar(25) NULL, `Passwordu` varchar(30) NOT NULL, `nom_usuario` varchar(50) NULL)');
				tx.executeSql('INSERT INTO usuarios(login, Passwordu, nom_usuario) VALUES("admin","123", "administrador")');
				tx.executeSql('INSERT INTO usuarios(login, Passwordu, nom_usuario) VALUES("superv","123", "supervisor")');
			
				tx.executeSql('DROP TABLE IF EXISTS sesiones');
				tx.executeSql('CREATE TABLE sesiones(`id` INTEGER NOT NULL PRIMARY KEY, `cod_usuario` INT(10)  NOT NULL, `login` varchar(25) NOT NULL, `inicioSesion` DATETIME NOT NULL, `finSesion` DATETIME NULL, `activo` BOOLEAN NOT NULL)');

				tx.executeSql('DROP TABLE IF EXISTS TblPlagas');
				tx.executeSql('CREATE TABLE TblPlagas(`Codigo` INTEGER NOT NULL PRIMARY KEY, `Nombre` varchar(50) NOT NULL)');
				tx.executeSql('INSERT INTO TblPlagas(Nombre) VALUES("Natada subpectinata")');
				tx.executeSql('INSERT INTO TblPlagas(Nombre) VALUES("Loxotoma Elegans Zeller")');

				tx.executeSql('DROP TABLE IF EXISTS TblPlagasPresentacion');
				tx.executeSql('CREATE TABLE TblPlagasPresentacion(`IdPres` INTEGER NOT NULL PRIMARY KEY, `CodigoPlaga` INT NOT NULL, `Presentacion` varchar(4) NOT NULL)');
				tx.executeSql('INSERT INTO TblPlagasPresentacion(CodigoPlaga, Presentacion) VALUES(1, "Huevo")');
				tx.executeSql('INSERT INTO TblPlagasPresentacion(CodigoPlaga, Presentacion) VALUES(1, "Larvas")');
				tx.executeSql('INSERT INTO TblPlagasPresentacion(CodigoPlaga, Presentacion) VALUES(1, "Adultos")');
				tx.executeSql('INSERT INTO TblPlagasPresentacion(CodigoPlaga, Presentacion) VALUES(2, "Huevos")');
				tx.executeSql('INSERT INTO TblPlagasPresentacion(CodigoPlaga, Presentacion) VALUES(2, "Larvas")');
				tx.executeSql('INSERT INTO TblPlagasPresentacion(CodigoPlaga, Presentacion) VALUES(2, "Adultos")');

				tx.executeSql('DROP TABLE IF EXISTS TblBLOQUES');
				tx.executeSql('CREATE TABLE TblBLOQUES(`CodBloque` varchar(5) NOT NULL, `Nombre` varchar(20) NOT NULL)');
				tx.executeSql('INSERT INTO TblBLOQUES(CodBloque, Nombre) VALUES("101", 25)');
				tx.executeSql('INSERT INTO TblBLOQUES(CodBloque, Nombre) VALUES("102", 35)');
				tx.executeSql('INSERT INTO TblBLOQUES(CodBloque, Nombre) VALUES("103", 28)');
				tx.executeSql('INSERT INTO TblBLOQUES(CodBloque, Nombre) VALUES("104", 15)');
				tx.executeSql('INSERT INTO TblBLOQUES(CodBloque, Nombre) VALUES("105", 25)');

				tx.executeSql('DROP TABLE IF EXISTS TblLOTES');
				tx.executeSql('CREATE TABLE TblLOTES(`CodLote` varchar(3) NOT NULL, `CodBloque` varchar(5) NOT NULL)');
				tx.executeSql('INSERT INTO TblLOTES(CodLote, CodBloque) VALUES("1", "101")');
				tx.executeSql('INSERT INTO TblLOTES(CodLote, CodBloque) VALUES("2", "101")');
				tx.executeSql('INSERT INTO TblLOTES(CodLote, CodBloque) VALUES("3", "101")');
				tx.executeSql('INSERT INTO TblLOTES(CodLote, CodBloque) VALUES("1", "102")');
				tx.executeSql('INSERT INTO TblLOTES(CodLote, CodBloque) VALUES("2", "102")');
				tx.executeSql('INSERT INTO TblLOTES(CodLote, CodBloque) VALUES("1", "103")');
				tx.executeSql('INSERT INTO TblLOTES(CodLote, CodBloque) VALUES("2", "103")');
				tx.executeSql('INSERT INTO TblLOTES(CodLote, CodBloque) VALUES("1", "104")');
				tx.executeSql('INSERT INTO TblLOTES(CodLote, CodBloque) VALUES("2", "105")');

				tx.executeSql('DROP TABLE IF EXISTS TblLINEAS');
				tx.executeSql('CREATE TABLE TblLINEAS(`Id` INTEGER NOT NULL PRIMARY KEY, `LINEA` INT NOT NULL, `CodLote` varchar(3) NOT NULL, `CodBloque` varchar(5) NOT NULL, `PALMAS` INT NOT NULL)');
				tx.executeSql('INSERT INTO TblLINEAS(LINEA, CodLote, CodBloque, PALMAS) VALUES(1, "1","101",23)');
				tx.executeSql('INSERT INTO TblLINEAS(LINEA, CodLote, CodBloque, PALMAS) VALUES(2, "1","101",13)');
				tx.executeSql('INSERT INTO TblLINEAS(LINEA, CodLote, CodBloque, PALMAS) VALUES(3, "1","101",33)');
				tx.executeSql('INSERT INTO TblLINEAS(LINEA, CodLote, CodBloque, PALMAS) VALUES(4, "1","101",43)');
				tx.executeSql('INSERT INTO TblLINEAS(LINEA, CodLote, CodBloque, PALMAS) VALUES(5, "2","101",24)');
				tx.executeSql('INSERT INTO TblLINEAS(LINEA, CodLote, CodBloque, PALMAS) VALUES(6, "2","101",20)');
				tx.executeSql('INSERT INTO TblLINEAS(LINEA, CodLote, CodBloque, PALMAS) VALUES(1, "1","102",23)');
				tx.executeSql('INSERT INTO TblLINEAS(LINEA, CodLote, CodBloque, PALMAS) VALUES(2, "1","102",23)');
				tx.executeSql('INSERT INTO TblLINEAS(LINEA, CodLote, CodBloque, PALMAS) VALUES(3, "1","102",23)');
				tx.executeSql('INSERT INTO TblLINEAS(LINEA, CodLote, CodBloque, PALMAS) VALUES(4, "2","102",23)');
				tx.executeSql('INSERT INTO TblLINEAS(LINEA, CodLote, CodBloque, PALMAS) VALUES(5, "2","102",23)');
				tx.executeSql('INSERT INTO TblLINEAS(LINEA, CodLote, CodBloque, PALMAS) VALUES(6, "2","102",23)');
				tx.executeSql('INSERT INTO TblLINEAS(LINEA, CodLote, CodBloque, PALMAS) VALUES(1, "1","103",23)');
				tx.executeSql('INSERT INTO TblLINEAS(LINEA, CodLote, CodBloque, PALMAS) VALUES(2, "1","103",23)');
				tx.executeSql('INSERT INTO TblLINEAS(LINEA, CodLote, CodBloque, PALMAS) VALUES(3, "1","103",23)');
				tx.executeSql('INSERT INTO TblLINEAS(LINEA, CodLote, CodBloque, PALMAS) VALUES(4, "2","103",23)');
				tx.executeSql('INSERT INTO TblLINEAS(LINEA, CodLote, CodBloque, PALMAS) VALUES(5, "2","103",23)');
				tx.executeSql('INSERT INTO TblLINEAS(LINEA, CodLote, CodBloque, PALMAS) VALUES(6, "2","103",23)');
				tx.executeSql('INSERT INTO TblLINEAS(LINEA, CodLote, CodBloque, PALMAS) VALUES(1, "1","104",23)');
				tx.executeSql('INSERT INTO TblLINEAS(LINEA, CodLote, CodBloque, PALMAS) VALUES(2, "1","104",23)');
				tx.executeSql('INSERT INTO TblLINEAS(LINEA, CodLote, CodBloque, PALMAS) VALUES(3, "1","104",23)');
				tx.executeSql('INSERT INTO TblLINEAS(LINEA, CodLote, CodBloque, PALMAS) VALUES(4, "1","105",23)');
				tx.executeSql('INSERT INTO TblLINEAS(LINEA, CodLote, CodBloque, PALMAS) VALUES(5, "1","105",23)');
				tx.executeSql('INSERT INTO TblLINEAS(LINEA, CodLote, CodBloque, PALMAS) VALUES(6, "1","105",23)');

				tx.executeSql('DROP TABLE IF EXISTS TblRowData');
				tx.executeSql('CREATE TABLE TblRowData(`Id` INTEGER NOT NULL PRIMARY KEY, `fecha` DATETIME NOT NULL, `CodBloque` varchar(5) NOT NULL, `CodLote` varchar(3) NOT NULL, `LINEA` INT NOT NULL, `PALMAS` INT NOT NULL, `CodigoPlaga` INT NOT NULL, `cantidad` INT NOT NULL)');
			}, function(e) {
				alert("ERROR: " + e.message);
			});
		}
	});


	function renderAddRow(){
		db.transaction(function(tx){
			tx.executeSql("SELECT CodBloque, Nombre FROM TblBLOQUES;", [], function(tx, res) {
				for(var i=0; i<res.rows.length; i++){
					bloques[i] = res.rows.item(i);
				}
			});

			tx.executeSql("SELECT Codigo, Nombre FROM TblPlagas;", [], function(tx, res) {
				var optStr = '<option value="">Plaga</option>';
				for(var i=0; i<res.rows.length; i++){
					optStr += '<option value="'+res.rows.item(i).Codigo+'">'+res.rows.item(i).Nombre+'</option>';
				}

				$('#CodigoPlaga').html(optStr);
			});		
		});
	}


	function insertNewRow(){
		db.transaction(function(tx){
			tx.executeSql("SELECT CodBloque, Nombre FROM TblBLOQUES;", [], function(tx, res) {

			});		
		}, function(e) {
			console.log("ERROR: " + e.message);
		});	
	}


	$(document).ready(function(){
		renderAddRow();

		db.transaction(function(tx) {
			tx.executeSql('INSERT INTO TblLINEAS() VALUES()', [], function(tx, res) {
				if(res.rows.length > 0){
					$.mobile.navigate('#dashBoard');
				}
			});
		});


		$.validator.addMethod("bloqueValid", function(value, element){
			var resultado = false;

			$.each(bloques, function(index, data){
				if(data.Nombre == value){
					$('input[name=bloque]').attr('data-id', data.CodBloque)
					db.transaction(function(tx) {
						tx.executeSql("SELECT CodLote FROM TblLOTES WHERE CodBloque ="+ data.CodBloque, [], function(tx, res) {
							for(var i=0; i<res.rows.length; i++){
								lotes[i] = res.rows.item(i).CodLote;
							}
						}, function(e) {
							alert("ERROR: " + e.message);
						});
					});

					resultado = true;
					return false;
				}
			});

			return resultado;
		}, "Bloque inexistente");

		$.validator.addMethod("loteValid", function(value, element){
			var resultado = false;

			if($.inArray(value, lotes) != -1){
				resultado = true;

				db.transaction(function(tx) {
					tx.executeSql("SELECT LINEA, PALMAS FROM TblLINEAS WHERE CodLote ="+value+" AND CodBloque ="+ $('input[name=bloque]').attr('data-id'), [], function(tx, res) {
						for(var i=0; i<res.rows.length; i++){
							lienas[i] = res.rows.item(i);
						}
					}, function(e) {
						alert("ERROR: " + e.message);
					});
				});
			}

			return resultado;
		}, "Lote inexistente");

		$.validator.addMethod("lineaValid", function(value, element){
			var resultado = false;

			$.each(lienas, function(index, data){
				if(data.LINEA == parseInt(value)){
					nPalmas = data.PALMAS;

					resultado = true;
					return false;
				}
			});

			return resultado;
		}, "Linea inexistente");

		$.validator.addMethod("palmaValid", function(value, element){
			return value <= nPalmas;
		}, "Palma inexistente");		

		$('#formAddRow').validate({
			rules: {
				bloque: {
					bloqueValid: true
				},
				lote: {
					loteValid: true
				},
				linea: {
					lineaValid: true
				},
				palma: {
					palmaValid: true
				}
			},
			submitHandler: function(form) {
				insertNewRow();
			}
		});

		$('#btnSalir').click(function(){
			db.transaction(function(tx) {
				tx.executeSql("UPDATE sesiones SET finSesion = datetime('now'), activo = 0 WHERE activo = 1;", [], function(tx, res) {
					$.mobile.navigate('#login');
				});
			});
		});

		$('#btnSubmitLogin').click(function(){
			db.transaction(function(tx) {
				tx.executeSql("SELECT * FROM usuarios WHERE login = '"+$('#txtUser').val()+"' AND Passwordu = '"+$('#txtPassword').val()+"';", [], function(tx, res) {
					if(res.rows.length > 0){
						tx.executeSql('INSERT INTO sesiones(cod_usuario, login, inicioSesion, activo) VALUES("'+res.rows.item(0).cod_usuario+'","'+res.rows.item(0).login+'", datetime("now"), 1)');

						$.mobile.navigate('#dashBoard');
					}else{
						$('#dlg-invalid-credentials').popup('open');
					}
				});
			});
		});

		$('#CodigoPlaga').change(function(){
			if($(this).val() != ''){
				var ddValue = $(this).val();

				db.transaction(function(tx){
					tx.executeSql("SELECT IdPres, Presentacion FROM TblPlagasPresentacion WHERE CodigoPlaga ="+ ddValue, [], function(tx, res) {
						var optStr = '<option value="">Presentacion</option>';
						for(var i=0; i<res.rows.length; i++){
							optStr += '<option value="'+res.rows.item(i).IdPres+'">'+res.rows.item(i).Presentacion+'</option>';
						}

						$('#Presentacion').html(optStr);
					});
				});
			}else{
				$('#Presentacion').html('<option value="">Presentacion</option>');
			}
		});
	});
}