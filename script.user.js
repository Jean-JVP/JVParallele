// ==UserScript==
// @name     JVParallele
// @namespace https://jvparallele.fr
// @version  0.42005
// @grant    GM_xmlhttpRequest
// @grant    GM.xmlHttpRequest
// @connect  jvparallele.fr
// @match        http://www.jeuxvideo.com/forums/*
// @match        http://www.jeuxvideo.com/recherche/forums/*
// @icon         https://jvparallele.fr/icone.png
// @downloadURL  https://jvparallele.fr/jvpfixed.user.js
// @updateURL    https://jvparallele.fr/jvpfixed.user.js
// // www.jeuxvideo.com/login
// @run-at document-start
// @license MIT
// ==/UserScript==


const NO_VERSION = "0.42005";
const urlServ = "https://jvparallele.fr";    // sans "/" final
const imgAvatarDefaut = 'http://image.jeuxvideo.com/avatar-sm/default.jpg';
const POSTS_PAR_PAGE = 20;
const TOPICS_PAR_PAGE = 25;


const IMG_LIGHTNING = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAvUlEQVQ4jaWRoQoCQRRFDwYRMU0yiojI4ieYNix+hl/gT/gBBpNZDGL0O2STwWQ2iBhEDHINzsIyMOyMO3DbnHt474HnCYaCp+BVykPQ9zFuwVYgJ8tQeCT4OPBNYOrY53XsZ0Gzjv0qyAVHwSDWXs6qyt4SGJuJU3YRdILGsGU7x57FwGPHfhD0bNohBXvPDjaV1xA0BJlgas9XwAsFz/ArSiz4Fsxi2KJgLbgL0n9gIzgJkmjYFqSCbsjfL/pnqVpMp6kJAAAAAElFTkSuQmCC";
const IMG_AUTH = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAZdEVYdFNvZnR3YXJlAHBhaW50Lm5ldCA0LjAuMjHxIGmVAAACsUlEQVRIS82UXU8TQRiF/U9WjNEbLyTBSC1fCaJGUSDa+pmYWqsGxVrtRZFIgEYJUWPVKxVjQUCiQLdFQzVQCJaUIF4hBkqLeGOc48x0trR0t2XJSjzJyTt9u5lnzs7MbsEm6/8GjoQn4XvnR7cwG7OeFq0LOD41zSd3ejpw7lYzTl53c7Oxs6UDvvcSxiNR8XRu5QWyBM62BzjtaILlmot4O7vgfSVMx+b62zjluMOfCY3nT5sXGPwchtV1F3V2B+n1B0V3VX3SMGrtDTA3NNK3IImuutb1SkfGJvDWPyx+Zat3KEgXdAM3PQ8R+DQmusrSdGhy6fFLH6rtLnTR/cwl3YDezm6Un7HDef8Rpma+iW62dAO+GQigxGKFrfEepNCo6GZLN2DPYBJ4qcmDQEh9H3UHWt3tOQ+Ofq90MAijxUYuuNuJFAqLbrYUgb8W+xGff4oEdfz7k1SVvfzjGWIzrYh9bcXSLDWtEwPlJNSzBxF/MfkyVImfc51itkwpAhN0QiwdIkgcJohVgVquSdP+n0gBhMXYQKuBIFoAMrUNcboQJSkCWQoBI1ioBHWyysAV+l/UwCAc9HvSAGpe2QIQ3UHTt4nZMqUOZBPLoGTlC1iYPghbfRm5aNtL5j9s56nSgayylEuzGwNmOlGFmvMmFBQaqctw3LIPLKkApcyAmhKyQ8LS8FSrKTmw4th+ATShotrIgHIy2TzhRoCKCf39B1LAgee7dAemJ+R7OCpVka2FRmoT+fh6pwyULQOJpj1ck3AVSBN6WkqJSEia3bvTE6YDtR0alT3kwKMnTAJYRo7UFasl1O+UXnaUoPZsKWrMRbh6pQigd1GAUta8h+yzRi9+ErrWFEovPkvGnfbFSVnzxV9Z7ONQllTJ7JXL31I1L8+9ELNlShH4L7XJQOAvx2QdkcHRITkAAAAASUVORK5CYII=";
const IMG_INTERDIT = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAZdEVYdFNvZnR3YXJlAHBhaW50Lm5ldCA0LjAuMjHxIGmVAAABr0lEQVQ4T22SyytGURTFV97vgZRMRDLw/5gqytBYSnmkTxkY+BsM5JmIPPKIUFLk7UvIIwaGHnnk89v321f3YtXq7LPXWuece+7Rb+xKVYdS4kjaZnx07sC+A6nGbX+RkjIwdRB8gynqd3hmDHvQegm8mR5LozMdHnTTDXXTvVTosvao6TXCK/eMxRah0WoChi1Y6u0YZqVctBlfIMXndAfCvlRO4xnen0plQfMXCOagT1mQehZeU78xVoqVwt1b3B+DheFkGE5ykmOp2eawy44/h/D13+47Ujb6hJvnLqU867NICfMPuG472C0/BIkILIw27uH5MBwC7QLeWpGEsQW44SxCoxZGW7yW8l36Ado5DBZYgD+fsEKY+bCF4RInKQgSEdhvRbM3sWELtJmZscXC1EMeXr77J2xAa/BMj7jRCiYvTO5gsDPjqu3i/hhOpGL0C3zveKqDJpN2C3p4LfoKo0Arggvu7fU2M54yjRFf4JK30bAZuTh6Oexcz5h0z7RdtMtp2NtGSED7v2Z6hfvUe/DJevAT9tsv9thfYKg1k4ct+ER9CAc4WZ3bHNI3CkbtjwjzZyUAAAAASUVORK5CYII=";
const IMG_RESTORE = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAZdEVYdFNvZnR3YXJlAHBhaW50Lm5ldCA0LjAuMjHxIGmVAAAB5ElEQVQ4T2PABuz372epOfCkOGf7vVKoEPGg/uBzs9ztd89HrLj0N2TxRXWoMGGQu+0WX8nu+5Pj1179E7z43P/Ahae3QaUIg/I9D33TNt54ErTo7H//+Sf/+8w59t9/3tH/YYtOvA1bcnxn/KrTZSXbLitDlWOCqBUXPvnNO/nfe87R/x4zD/53nbbvv/Pk3f8dJuz4b9u35b9V98b/dr2b/nlO27ElZsVRHag2BPCadTjZffqBP65T9/53mrTrv/2E7f9tejf/t+za8N+sfe1/45ZV/w2alv/XrV/836hp6U/n/g1xUK0IALQx2LZv6w/rns3/LTrXgzSuMGpduVC/celRnbpFP7RqFvzXrJ4Pxjp1C/9Yda2zhGpFAIuuDS4mbas/Gzav+K/XsCQWKsygXz9fQLN6Xo1G9fxfMEO0qudvgEqjAv36pWbatQveABXNhgrBgUbVgjSYAZpV815DhTGBVuVcLY2qeauhXDgIXbWKGaj5A8gAjar5X6HCJID//xmBGt9CXDHvDFSUeKBZMz8A5gWgC1OgwsQBtcoFeppV819DNS8CuQYqRQAAFQI1JQM1fQbGwgsgnQUUJE6zVv18Ca3qeRM1a+ZNAaYDP5XciexQKRTA+J9o5yAARA8DIwApPvBn2q6sNwAAAABJRU5ErkJggg==";


// nombre de connectés par topic
const INTERVALLE_HEARTBEAT_ONGLET = 15000,		// chaque onglet met une variable locale à jour régulièrement pour signaler qu'il est toujours ouvert
      MAX_AGE_ONGLET = INTERVALLE_HEARTBEAT_ONGLET + 5000,		// durée sans mise à jour au-delà de laquelle un onglet est supposé fermé ou plus actif
			INTERVALLE_VERIF_HEARTBEAT_GLOBAL = 10000,		// tout onglet ouvert sur un topic vérifie aussi périodiquement si il est temps d'envoyer les infos (sur les topics ouverts) au serveur
			INTERVALLE_ENVOI_HEARTBEAT_GLOBAL = 20000,				// ...mais ces infos ne sont pas envoyées plus souvent que cette cet intervalle (et pas moins souvent que INTERVALLE_VERIF_HEARTBEAT_GLOBAL + INTERVALLE_ENVOI_HEARTBEAT_GLOBAL)
			DUREE_HEARTBEAT_ONGLET = 65000,				// un topic cesse son heartbeat personnel après ce délai
			DUREE_HEARTBEAT_GLOBAL = 65000;			// et cesse de gérer/surveiller l'envoi au serveur après celui-ci

// infos gardées par le client sur la présence de posts jvp dans les pages jvc annexes
const VALIDITE_CACHE_NUM_PAGES_JVC = 300000;
const VALIDITE_CACHE_NUM_DERNIERE_PAGE_JVC = 90000;


function getPageType(){
  var url = window.location.href;
	return url.match(/^https?:\/\/(?:www\.)?jeuxvideo\.com\/forums\/[1-9]+\-/) ? 'topicjvc' : (
				 url.match(/^https?:\/\/(?:www\.)?jeuxvideo\.com\/forums\/0\-[^#]+#pppf/) ? 'liste_topics_n4' : (
				 url.match(/^https?:\/\/(?:www\.)?jeuxvideo\.com\/forums\/0\-[^#]+#pppt?/) ? 'topicn4' : (
  			 url.match(/^https?:\/\/(?:www\.)?jeuxvideo\.com\/recherche\/forums\/0\-/) ? 'recherche' : (
  			 url.match(/^https?:\/\/(?:www\.)?jeuxvideo\.com\/forums\/0\-/) ? 'liste_topics' : (
         url.match(/^https?:\/\/(?:www\.)?jeuxvideo\.com\/login[^#]*#ppp/) ? 'connexion' :
  			 null)))));
  }

	
class ControleurPage{
	constructor(){
		this.modeListeTopics = location.hash.indexOf('#pppf') === 0 || location.hash.indexOf('#pppt') === 0 ? 'full_jvp' : 'mix';
		this.createManager();
		this.createHandlers();
		this.bindHandlers();
	}
	// crée ces fonctions "en temps réel", de façon à leur passer pMgr
	createHandlers(){
		var pMgr = this.pageManager;
		var ceCtrl = this;
		
		this.handlerAuth = function(pseudo,mdp){
			let inputPseudo = pMgr.getInputPseudoN4();
			if(!pseudo){
				pMgr.afficherMessage('Entrez votre pseudo.','danger',inputPseudo.parentNode,true);
				return;
			}
			if(!mdp){
				pMgr.afficherMessage('Entrez votre mot de passe.','danger',inputPseudo.parentNode,true);
				return;
			}
			Serv.auth(pseudo,mdp,function(errCode,msg,res){
				if(!errCode){
					pMgr.pseudoAuth = res.pseudo;
					localStorage.setItem('n5_pseudoN4',res.pseudo);
					pMgr.setInputMdpN4Value('');
				}
				else{
					pMgr.afficherMessage(msg,'danger',inputPseudo.parentNode,true);
				}
			});
		};
		
		this.handlerDeauth = function(){
			Serv.deauth(function(errCode,msg,res){
				if(!errCode){
					pMgr.pseudoAuth = '';
				}
				else{
					//  pas d'erreurs logiques, au pire des problèmes de connexion ou ce genre de choses
				}
			});
		}
		
		this.handlerBannirAuteurTopic = function(topicId){
			Serv.banAuteurTopic(topicId,function(errCode,msg,res){
				if(!errCode){
					pMgr.reloadPage();
				}
				else{
					pMgr.afficherMessageNotif(msg,'danger');
				}
			});
		};

		this.handlerDebannirAuteurTopic = function(topicId){
			Serv.debanAuteurTopic(topicId,function(errCode,msg,res){
				if(!errCode){
					pMgr.reloadPage();
				}
				else{
					pMgr.afficherMessageNotif(msg,'danger');
				}
			});
		};

		this.handlerDeleteTopic = function(topicId,titre){
			if(!confirm('Supprimer le topic "' + titre + '" ?')){
				return;
			}
			Serv.deleteTopic(topicId,function(errCode,msg,res){
				if(!errCode){
					pMgr.reloadPage();
				}
				else{
					pMgr.afficherMessageNotif(msg,'danger');
				}
			});
		};
		
		this.handlerCreerTopic = function(texte,nomAuteur,estAuteurJvc,titreTopic){
			if(!nomAuteur){
				let inputPseudo = pMgr.getInputPseudoN4();
				pMgr.afficherMessage('Pseudo non spécifié.','danger',inputPseudo.parentNode,true);
				return;
			}
			if(!titreTopic.trim()){
				pMgr.afficherMessagePresDuForm('Titre non spécifié.','warning');
				return;
			}
			if(pMgr.dernierClicBtPoster && (new Date() - pMgr.dernierClicBtPoster) < 5000){
				return;
			}
			pMgr.dernierClicBtPoster = new Date();
			let forumId = pMgr.pageInfo.forumId;
			Serv.createThread(titreTopic,texte,forumId,nomAuteur,estAuteurJvc,function(errCode,msg,res){
				if(!errCode){
					pMgr.viderFormNvTopic();
					window.location.href = pMgr.pageInfo.urlForum + (ceCtrl.modeListeTopics == 'full_jvp' ? '#pppt-' : '#ppp-') + res.id + '-1#haut';
				}
				else{
					pMgr.afficherMessagePresDuForm(msg,'danger');
				}
			});
		};
		
		// crée un post pour topic jvp
		this.handlerCreerPostTopicN4 = function(texte,nomAuteur,estAuteurJvc){
			if(!nomAuteur){
				let inputPseudo = pMgr.getInputPseudoN4();
				pMgr.afficherMessage('Pseudo non spécifié.','danger',inputPseudo.parentNode,true);
				return;
			}
			if(!texte.trim()){
				pMgr.afficherMessagePresDuForm('Message non spécifié.','warning');
				return;
			}
			if(pMgr.dernierClicBtPoster && (new Date() - pMgr.dernierClicBtPoster) < 3000){			// évite l'envoi de plusieurs requêtes à la suite, le serveur peut prendre un peu de temps
				return;
			}
			pMgr.dernierClicBtPoster = new Date();
			Serv.createPost('n4','',pMgr.pageInfo.topicN4Id,pMgr.pageInfo.forumId,texte,nomAuteur,estAuteurJvc,'',function(errCode,msg,res){
				if(errCode == 0){
					pMgr.viderFormPost();
					window.location.href = pMgr.pageInfo.urlForum + (ceCtrl.modeListeTopics == 'full_jvp' ? '#ppp-' : '#ppp-') + pMgr.pageInfo.topicN4Id + '-' + ((res.nvNbMsgs-1) - ((res.nvNbMsgs-1) % POSTS_PAR_PAGE) + 1) + '#bas';
					pMgr.reloadPage();
				 }
				else{
					pMgr.afficherMessagePresDuForm(msg,'danger');
				}
			});
		};
		
		this.handlerCreerPostTopicJvc = function(texte,nomAuteur,estAuteurJvc){
			// poster un message parallèle
			if(!nomAuteur){
				let inputPseudo = pMgr.getInputPseudoN4();
				pMgr.afficherMessage('Pseudo non spécifié.','danger',inputPseudo.parentNode,true);
				return;
				}
			if(!texte.trim()){
				pMgr.afficherMessagePresDuForm('Message non spécifié.','warning');
				return;
			}
			if(pMgr.dernierClicBtPoster && (new Date() - pMgr.dernierClicBtPoster) < 3000){			// évite l'envoi de plusieurs requêtes à la suite, le serveur peut prendre un peu de temps
				return;
			}
			pMgr.dernierClicBtPoster = new Date();
			Serv.createPost('parallele','',pMgr.pageInfo.topicJvcId,pMgr.pageInfo.forumId,texte,nomAuteur,estAuteurJvc,null,function(errCode,msg,res){
				if(!errCode){
					pMgr.viderFormPost();
					let urlDernierePage = pMgr.getUrlDernierePage() || window.location.href;
					let redir = urlDernierePage.split('#')[0] + '#bas';
					if(window.location.href == redir){
						pMgr.reloadPage();
					}
					else{
						window.location = redir;
					}
				}
				else{
					pMgr.afficherMessagePresDuForm(msg,'danger');
				}
			})
		};
		
		this.handlerDeletePost = function(postId,postElem){
			if(pMgr.dernierClicBtDelete && (new Date() - pMgr.dernierClicBtDelete) < 2500){			// évite l'envoi de plusieurs requêtes à la suite, le serveur peut prendre un peu de temps
				return;
			}
			pMgr.dernierClicBtDelete = new Date();
			Serv.deletePost(postId,function(errCode,msg,res){
				if(!errCode){
					pMgr.reloadPage();
				}
				else{
					pMgr.afficherMessage(msg,'danger',postElem);
				}
			});
		};
		
		this.handlerConfirmEditPost = function(postId,nouveauTexte,postElem){
			if(!nouveauTexte.trim()){
				pMgr.afficherMessage('Texte manquant.','warning',postElem);
				return
			}
			if(pMgr.dernierClicBtEdit && (new Date() - pMgr.dernierClicBtEdit) < 3000){			// évite l'envoi de plusieurs requêtes à la suite, le serveur peut prendre un peu de temps
				return;
			}
			pMgr.dernierClicBtEdit = new Date();
			Serv.editPost(postId,nouveauTexte,function(errCode,msg,res){
				if(errCode){
					pMgr.afficherMessage(msg,'danger',postElem);
				}
				else{
					pMgr.viderFormPost();
					pMgr.reloadPage();
				}
			});
		};		
		
		this.handlerBannirAuteurPost = function(postId){
			Serv.banAuteurPost(postId,function(errCode,msg,res){
				if(!errCode){
					pMgr.reloadPage();
				}
				else{
					pMgr.afficherMessageNotif(msg,'danger');
				}
			});
		};
		
		this.handlerDebannirAuteurPost = function(postId){
			Serv.debanAuteurPost(postId,function(errCode,msg,res){
				if(!errCode){
					pMgr.reloadPage();
				}
				else{
					pMgr.afficherMessageNotif(msg,'danger');
				}
			});
		};
		
		this.handlerSignalerAuteurPost = function(postId,postElem){
			Serv.signalerPost(postId,function(errCode,msg,res){
				if(!errCode){
					alert('Contenu signalé.');
					pMgr.reloadPage();
				}
				else{
					pMgr.afficherMessage(msg,'danger',postElem);
				}
			});
		};
	}
	
	// dépend des pages
	createManager(){}
	bindHandlers(){}
	
	// envoie périodiquement au serveur l'état des topics ouverts, pour compter les connectés
	startGlobalHeartbeat(intervalleVerif,intervalleEnvoi,ageMaxTopic,duree){
		let ceMgr = this;
		var tMax;
		if(typeof duree == 'undefined'){
			tMax = -1;
		}
		else{
			tMax = Date.now() + duree;
		}
		var interval = setInterval(function(){
			// stoppe le timer si durée dépassée
			var mtn = Date.now();
			if(tMax != -1 && mtn > tMax){
				clearInterval(interval);
				return;
			}
			
			var dernier = localStorage.getItem('n5_dernierHeartbeatGlobal') || 0;
			// d'autres onglets peuvent faire tourner ce chrono en même temps, pas besoin qu'ils envoient tous des requêtes en parallèle. Celui qui le fait met à jour le timestamp n4_dernierHeartbeatGlobal
			if(dernier < mtn - intervalleEnvoi){
				localStorage.setItem('n5_dernierHeartbeatGlobal',mtn);
				let topicsOuverts = localStorage.getItem('n5_topicsOuverts');
				if(!topicsOuverts){
					topicsOuverts = {};
				}
				else{
					topicsOuverts = JSON.parse(topicsOuverts);
					// ici, envoyer les timestamps des topics au serveur
					Serv.heartbeatTopics(topicsOuverts);
					// efface ceux trop vieux
					for(let i in topicsOuverts){
						if(topicsOuverts[i].timestamp + ageMaxTopic < mtn){
							delete topicsOuverts[i];
						}
					}
					
				}
				localStorage.setItem('n5_topicsOuverts',JSON.stringify(topicsOuverts));
			}
		},intervalleVerif);
		
	}
	
	// tient à jour dans une variable en localstorage une liste des topics ouvert et leur dernier signe d'"activité" (timestamp)
	// pour un topic de jvc, topicId doit le préfixe 'jvc_' suivi de l'id jvc du topic
	startTopicHeartbeat(topicId,intervalle,duree){
		let ceMgr = this;
		ceMgr.updateTopicActivityTimestamp(topicId);
		var tMax;
		if(typeof duree == 'undefined'){
			tMax = -1;
		}
		else{
			tMax = Date.now() + duree;
		}
		var interval = setInterval(function(){
			if(tMax != -1 && Date.now() > tMax){
				clearInterval(interval);
				return;				
			}
			ceMgr.updateTopicActivityTimestamp(topicId);
			
		},
		intervalle);
	}
	
	// met à jour le timestamp en localstorage pour le topic actuel
	updateTopicActivityTimestamp(topicId){
		var ceMgr = this;
		var pMgr = this.pageManager;
		var topicsOuverts = localStorage.getItem('n5_topicsOuverts');
		if(topicsOuverts){
			topicsOuverts = JSON.parse(topicsOuverts);
		}
		else{
			topicsOuverts = {};
		}
		topicsOuverts[topicId] = {timestamp:Date.now(),forumId:pMgr.pageInfo.forumId};
		localStorage.setItem('n5_topicsOuverts',JSON.stringify(topicsOuverts));
	}
	
}

class ControleurPageConnexion extends ControleurPage{
	createManager(){
		this.pageManager = new PageConnexionManager();
	}
	load(){
		// document.dispatchEvent(new Event('jvploaded'));
	}
}


class ControleurPageListeTopics extends ControleurPage{
	
	createManager(){
		this.pageManager = new PageListeTopicsManager(this.modeListeTopics);
	}
	
	bindHandlers(){
		this.pageManager.setOnBtAuthClicked(this.handlerAuth);
		this.pageManager.setOnBtDeauthClicked(this.handlerDeauth);
		this.pageManager.setOnPostButtonN4Clicked(this.handlerCreerTopic);
		this.pageManager.setOnBtBannirAuteurTopicClicked(this.handlerBannirAuteurTopic);
		this.pageManager.setOnBtDebannirAuteurTopicClicked(this.handlerDebannirAuteurTopic);
		this.pageManager.setOnBtDeleteTopicClicked(this.handlerDeleteTopic);
	}
	
	load(){
		var pMgr = this.pageManager;
		console.log('geting bornes');
		var bornes = pMgr.getBornesTemporellesSecurisees();
		console.log('bornes',bornes);
		var afficherEpingles = pMgr.pageInfo.offset == 1;
		var idsTopicsJvc = pMgr.topicsData.map(function(e){return e.id});
		
		Serv.getTopicsN4(pMgr.pageInfo.forumId,bornes.de,bornes.a,afficherEpingles,idsTopicsJvc,function(errCode,msg,res){
			if(!errCode){
				pMgr.injectTopics(res.threads,res.threadsSuppl);
				pMgr.injectNombrePostsN4(res.nbPostsN4Jvc);
				pMgr.pseudoAuth = res.pseudoAuth;
				pMgr.setNombreCoJvp(res.nombreConnectes);
				if(!pMgr.getInputPseudoN4Value()){
					pMgr.setInputPseudoN4Value(res.pseudoAuth);
					localStorage.setItem('n5_pseudoN4',res.pseudoAuth);
				}
				// document.dispatchEvent(new Event('jvploaded'));
			}
			else{
				pMgr.afficherMessageNotif(msg,'danger');
			}
		});
	}
}

class ControleurPageListeTopicsN4 extends ControleurPageListeTopics{
	load(){
		var pMgr = this.pageManager;
		pMgr.viderListe();
		
		Serv.getTopicsFullN4(pMgr.pageInfo.forumId,pMgr.pageInfo.offsetN4,function(errCode,msg,res){
			if(!errCode){
				let nbTopics = res.nombreTotal;
				if(pMgr.pageInfo.offsetN4 > nbTopics){
					if(nbTopics > 0){
						console.log('JVP - Trop loin, retour à la dernière page...');
						let offsetDernierePage = Math.ceil((nbTopics / TOPICS_PAR_PAGE) -1) * TOPICS_PAR_PAGE + 1;
						let redir = pMgr.pageInfo.urlForum + '#pppf-' + offsetDernierePage;
						window.location.href = redir;
						return;
					}
				}
				pMgr.injectTopics(res.threads,res.threadsSuppl,res.nombreTotal);
				pMgr.setNombreCoJvp(res.nombreConnectes);
				
				pMgr.pseudoAuth = res.pseudoAuth;
					
				if(!pMgr.remettreAncienScroll()){
					history.scrollRestoration && (history.scrollRestoration = "manual");
					window.scrollTo(0,0);
				}
				if(!pMgr.getInputPseudoN4Value()){
					pMgr.setInputPseudoN4Value(res.pseudoAuth);
					localStorage.setItem('n5_pseudoN4',res.pseudoAuth);
				}
				// document.dispatchEvent(new Event('jvploaded'));
			}
			else{
				pMgr.afficherMessage(msg,'danger');
			}
		});
	}
}

class ControleurPageTopicN4 extends ControleurPage{

	createManager(){
		this.pageManager = new PageTopicN4Manager();
	}
	bindHandlers(){
		var pMgr = this.pageManager;
		pMgr.setOnPostButtonN4Clicked(this.handlerCreerPostTopicN4);
		pMgr.setOnDeleteButtonN4Clicked(this.handlerDeletePost);
		
		pMgr.setOnConfirmEditButtonN4Clicked(this.handlerConfirmEditPost);
		pMgr.setOnBtAuthClicked(this.handlerAuth);
		pMgr.setOnBtDeauthClicked(this.handlerDeauth);
		pMgr.setOnBtBannirAuteurPostClicked(this.handlerBannirAuteurPost);
		pMgr.setOnBtDebannirAuteurPostClicked(this.handlerDebannirAuteurPost);
		pMgr.setOnBtSignalerPostClicked(this.handlerSignalerAuteurPost);
	}
	
	load(){
		var pMgr = this.pageManager;
		var ceMgr = this;
		
		Serv.getPosts(pMgr.pageInfo.topicN4Id,pMgr.pageInfo.forumId,pMgr.pageInfo.firstPostNum,function(errCode,msg,res){
			if(!errCode){
				// si on est au-delà de la dernière page (et qu'il existe quand même des posts avant), ramène à la dernière page
				if(res.posts.length == 0){
					if(res.threadInfo.nb > 0){
						console.log('JVP - Trop loin, retour à la dernière page...');
						let numDernierMess = res.threadInfo.nb;
						let numPremierMessageDernierePage = firstPostFromPagePost(numDernierMess);
						let redir = pMgr.pageInfo.urlForum + (ceMgr.modeListeTopics == 'full_jvp' ? '#pppt' : '#ppp') + '-' + res.threadInfo.id + '-' +numPremierMessageDernierePage;
						if(window.location.href == redir){
							pMgr.reloadPage();
						}
						else{
							window.location = redir;
						}
						return;
					}
				}
				pMgr.injectContent(res);
				
				if(window.location.hash.match(/#bas/)){
					scrollToBasElem(pMgr.getBlocOutilsBottom(),0,50);
				}
				else if(!pMgr.remettreAncienScroll()){
					// venant de la page liste des topics, on n'a pas vraiment changé d'url et le navigateur remet le scroll où il était, soit généralement trop bas
					history.scrollRestoration && (history.scrollRestoration = "manual");
					window.scrollTo(0,0);
				}
				
				pMgr.setNombreCoJvp(res.nombreConnectes);
				pMgr.pseudoAuth = res.pseudoAuth;
				if(!pMgr.getInputPseudoN4Value()){
					pMgr.setInputPseudoN4Value(res.pseudoAuth);
					localStorage.setItem('n5_pseudoN4',res.pseudoAuth);
				}
				// document.dispatchEvent(new Event('jvploaded'));
				
				ceMgr.startTopicHeartbeat(pMgr.pageInfo.topicN4Id,INTERVALLE_HEARTBEAT_ONGLET,DUREE_HEARTBEAT_ONGLET);
				ceMgr.startGlobalHeartbeat(INTERVALLE_VERIF_HEARTBEAT_GLOBAL,INTERVALLE_ENVOI_HEARTBEAT_GLOBAL,MAX_AGE_ONGLET,DUREE_HEARTBEAT_GLOBAL);
								
			}
			else{
				pMgr.afficherMessageNotif(msg,'danger');
				pMgr.getCtnrMessagesPagi().style.display = "none";
				pMgr.getBlocOutilsTop().style.display = "none";
			}
		});
	}
}

class ControleurPageTopicJvc extends ControleurPageTopicN4{
	
	createManager(){
		this.pageManager = new PageTopicJvcManager();
	}
	bindHandlers(){
		super.bindHandlers();
		this.pageManager.setOnPostButtonN4Clicked(this.handlerCreerPostTopicJvc);

	}

	load(){
		var ceMgr = this;
		var pMgr = this.pageManager;
		
		// enrichit un peu la classe Set
		Object.assign(Set.prototype,{
			intersection: function(b){return new Set(Array.from(this).filter(e => b.has(e)));},		// renvoie les éléments commun à deux ensembles
			union: function(b){return new Set([...this,...b]);},		// éléments des deux ensembles
			difference: function(b){return new Set(Array.from(this).filter(e => !b.has(e)));}		// éléments du premier ensemble ne se trouvant pas dans le deuxième
		});
		
		// charge les posts jvp pour la page courante et met en surbrillance les numéros de la pagination où se trouvent aussi des posts jvp

		// détecter les posts jvp sur les autres pages implique de connaitre la période de temps que chacune couvre, donc de les charger
		// Pour minimiser les requêtes (il peut en falloir jusqu'à 14), l'information est notée dans un cache local
		// le serveur aussi peut avoir cette info pour certaines pages, info qui peut être demandée en même temps que les posts jvp de la page courante
		
		var urlsPagesPagination = pMgr.getUrlsPagesPagi();
		var numeroPageCourante = pMgr.pageInfo.pageActuelle;
		var numeroDernierePage = urlsPagesPagination.reduce((a,c) => Math.max(c.nPage,a),1).toString();
		var numerosPagesPagination = new Set(urlsPagesPagination.map(a => a.nPage))
		
		// Pages connues localement ?
		var infosPagesConnues = ceMgr.savoirSiPagesJvcOntPosts(pMgr.pageInfo.topicJvcId);
		delete infosPagesConnues[numeroPageCourante];	// pas besoin du cache pour la page courante puisqu'on aura des infos à jour bientôt
		
		pMgr.marquerNumerosPages(infosPagesConnues);

		// Autres pages : demande au serveur en même temps que getPostsParallele (si jamais il les a en cache)
		var numerosPagesConnues = new Set(Object.keys(infosPagesConnues));
		var numerosPagesADemander = new Set(urlsPagesPagination.map(a => a.nPage.toString()));
		numerosPagesADemander = numerosPagesADemander.difference(numerosPagesConnues);
		numerosPagesADemander.delete(numeroPageCourante);		// (la page actu n'est pas considérée comme connue puisqu'on ne la prend pas en cache, mais on aura la réponse avec les posts, pas besoin de la demander spécifiquement)
			
		// sinon, les autres seront demandées au serveur après chargement des bornes des pages
					
		var numerosPagesADemanderString = Array.from(numerosPagesADemander).join(',');
		
		this.pageManager.getBornesTemporelles(function(bornes){
			Serv.getPostsParallele(pMgr.pageInfo.topicJvcId,pMgr.pageInfo.forumId,bornes.de,bornes.a,numeroPageCourante,numerosPagesADemanderString,function(errCode,msg,res){
				if(errCode){
					pMgr.afficherMessageNotif(msg,'danger');
					return;
				}
				pMgr.injectPosts(res.posts);
				if(window.location.hash.match(/#bas/)){
					scrollToBasElem(pMgr.getBlocOutilsBottom(),0,50);
				}
				else{
					pMgr.remettreAncienScroll();
				}
				pMgr.setNombreCoJvp(res.nombreConnectes);
				
				pMgr.pseudoAuth = res.pseudoAuth;
				if(!pMgr.getInputPseudoN4Value()){
					pMgr.setInputPseudoN4Value(res.pseudoAuth);
					localStorage.setItem('n5_pseudoN4',res.pseudoAuth);
				}
				// document.dispatchEvent(new Event('jvploaded'));
				
				
				ceMgr.startTopicHeartbeat('jvc_' + pMgr.pageInfo.topicJvcId,INTERVALLE_HEARTBEAT_ONGLET,DUREE_HEARTBEAT_ONGLET);
				ceMgr.startGlobalHeartbeat(INTERVALLE_VERIF_HEARTBEAT_GLOBAL,INTERVALLE_ENVOI_HEARTBEAT_GLOBAL,MAX_AGE_ONGLET,DUREE_HEARTBEAT_GLOBAL);				
				
				
				res.infosPagesAnnexes[numeroPageCourante] = res.posts.length > 0 ? 1 : 0;

				// met en surbrillance les pages avec topic jvp éventuellement signalées par le serveur
				pMgr.marquerNumerosPages(res.infosPagesAnnexes);
				// À voir : cas particulier dernière page ? (cache devrait être considéré valide moins longtemps)
								
				// note en local les infos sur les pages reçues avec getPostsParallele
				// ainsi que celles sur la page présente
				res.infosPagesAnnexes[numeroPageCourante] = res.posts.length > 0 ? 1 : 0;
				ceMgr.noterSiPagesJvcOntPosts(pMgr.pageInfo.topicJvcId,res.infosPagesAnnexes);

				
				// et sinon : requêter les bornes des autres pages et demander au serveur
				var numerosPagesRestantesADemander = numerosPagesADemander.difference(new Set(Object.keys(res.infosPagesAnnexes)));
				var urlsPagesRestantesADemander = urlsPagesPagination.filter(a => numerosPagesRestantesADemander.has(a.nPage));
				ceMgr.indiquerPostsJvcSurAutresPages(numerosPagesRestantesADemander);
				
			});
		});
		
		ceMgr.nettoyerCacheNumPagesJvc();

	}
	
	// met un fond vert (ou du moins la classe avec-posts-jvp-n4) sur les numéros de pages de la pagination où se trouvent des posts jvp
	// numeros est un Set ou un Array
	indiquerPostsJvcSurAutresPages(numerosPagesADemander){		
		numerosPagesADemander = new Set(numerosPagesADemander);
		var ceMgr = this;
		var pMgr = this.pageManager;
		var urlsPages = pMgr.getUrlsPagesPagi();
		if(numerosPagesADemander.size == 0 || urlsPages.length == 0){
			return;
		}
	
		// si la pagination fait un "trou" entre les pages "proches" et la dernière page du topic, il faut récupérer la page qui suit la dernière page proche pour connaître sa limite de fin
		let derARecup = urlsPages[urlsPages.length-1];
		let avantDerARecup = urlsPages[urlsPages.length-2];
		if(typeof avantDerARecup != 'undefined' && avantDerARecup.nPage != derARecup.nPage - 1 && derARecup.nPage - 1 != pMgr.pageInfo.pageActuelle){
			let n = (parseInt(avantDerARecup.nPage) + 1).toString();
			let url = PageTopicJvcManager.urlPageTopicJvc(avantDerARecup.url,n);
			urlsPages.push({nPage:n,url:url});
		}
		// ...et si la pagination saute des pages après la page 1, il faut obtenir la page 2 pour avoir la date de fin de la page 1
		if(urlsPages[0].nPage != "2" && typeof urlsPages[1] != 'undefined' && urlsPages[1].nPage != "2" && pMgr.pageInfo.pageActuelle != "2"){
			let urlP2 = PageTopicJvcManager.urlPageTopicJvc(urlsPages[0].url,"2");
			urlsPages.push({nPage:"2",url:urlP2});
		}
		
		// de ces pages, ne requêter que celles qui sont demandées dans le param numerosPagesADemander et celles qui sont éventuellement nécessaire pour connaître leurs bornes de fin respectives
		urlsPages.sort((a,b) => parseInt(a.nPage) < b.nPage ? - 1 : 1);
		urlsPages = urlsPages.filter((e,i,urls) => numerosPagesADemander.has(e.nPage) || (i > 0 && numerosPagesADemander.has(urls[i-1].nPage)));
				
		var pActu = pMgr.pageInfo.pageActuelle;
		
		var bornesTemporellesPages = [];
		
		
		var datePremierPostCettePage = pMgr.pageInfo.datePremierPost;
		
		// pas besoin de faire une requête pour la page actuelle
		let i = urlsPages.findIndex(a => a.nPage == pActu);
		if(i != -1){
			urlsPages.splice(i,1);
			bornesTemporellesPages.push({nPage:pActu,datePremierPost:datePremierPostCettePage,dateDernierPost:null});
		}
		
		var nombrePagesARecuperer = urlsPages.length;
		if(nombrePagesARecuperer == 0){
			return;
		}
		
		let requetesTerminees = 0;
		for(let i = 0 ; i < nombrePagesARecuperer ; i++){
			// à affiner : faire une fonction pour chaque requête n'est sans doute pas très optimal
			let onRetourRequete = function(nPage){return function(){
				if(this.readyState == XMLHttpRequest.DONE){
						if(this.status == 200){
							let html = this.responseText;
							let datePremierPost = ListePostsManager.getDatePremierPost(html);
							bornesTemporellesPages.push({nPage:nPage,datePremierPost:datePremierPost,dateDernierPost:null});
						}
						
						requetesTerminees++;
						if(requetesTerminees >= nombrePagesARecuperer){
							
							bornesTemporellesPages.sort((a,b) => parseInt(a.nPage) < b.nPage ? - 1 : 1);
						
							// pas de limite inférieure de date pour la première page
							if(bornesTemporellesPages[0].nPage == "1"){
								bornesTemporellesPages[0].datePremierPost = null;
							}
							
							// pas de limite supérieure de date pour la dernière page
							if(bornesTemporellesPages[bornesTemporellesPages.length - 1].nPage == urlsPages[urlsPages.length-1].nPage){
								bornesTemporellesPages[bornesTemporellesPages.length - 1].dateDernierPost = null;
							}
							
							// la bornes de fin d'une page est la date du premier post de la page suivante
							let maxJ = bornesTemporellesPages.length - 1;		// sauf pour la dernière page (pas de limite de fin)
							for(let j = 0 ; j < maxJ ; j++){
								bornesTemporellesPages[j].dateDernierPost = bornesTemporellesPages[j+1].datePremierPost;
							}
							
							// vire les pages qui n'ont été demandées que pour avoir la limite de la page précédente
							// ainsi que la page actuelle
							bornesTemporellesPages = bornesTemporellesPages.filter(e => numerosPagesADemander.has(e.nPage) && e.nPage != pActu);
						
							Serv.siPagesOntPostsJvp(pMgr.pageInfo.topicJvcId,bornesTemporellesPages,function(errCode,msg,res){
								if(!errCode){
									pMgr.marquerNumerosPages(res);
									ceMgr.noterSiPagesJvcOntPosts(pMgr.pageInfo.topicJvcId,res);
								}
									
							});

						}
				
				}
			
			};}(urlsPages[i].nPage);

			let xhr = new XMLHttpRequest();
			xhr.open("GET",urlsPages[i].url);
			
			xhr.onreadystatechange = onRetourRequete;
			xhr.send(null);
				
		}

	}
	
	// garde en cache l'info selon laquelle une page d'un topic jvc possède des posts jvp, pour minimiser les requêtes
	// pages = {nPage3:1,nPage5:0,...}
	// structure du cache : 'n4_cache_pages_topic_56060699' => {"3":[1,1533822276971],"4":[0,1533822276971],...} où "3" est le numéro de la page, 1 si elle a des posts jvp et 1533822276971 le timestamp
	noterSiPagesJvcOntPosts(idTopic,pages){
		var cleLocalStorage = 'n5_cache_pages_topic_' + idTopic;
		var cacheActuel = localStorage.getItem(cleLocalStorage);
		
		cacheActuel = cacheActuel ? JSON.parse(cacheActuel) : {};
		for(let i in pages){
			
			let cPage = [pages[i],Date.now()];
			cacheActuel[i] = cPage;
		}
		localStorage.setItem(cleLocalStorage,JSON.stringify(cacheActuel));
	}
	
	// renvoie {nPage3:1,nPage5:0,...}
	// ordre des pages non garanti
	savoirSiPagesJvcOntPosts(idTopic,numDernierePage){
		var cleLocalStorage = 'n5_cache_pages_topic_' + idTopic;
		var cacheCeTopic = localStorage.getItem(cleLocalStorage);
		if(!cacheCeTopic){
			return {};
		}
		cacheCeTopic = JSON.parse(cacheCeTopic);
		numDernierePage = parseInt(numDernierePage);
		var cacheMaj = false;
		for(let i in cacheCeTopic){
			// nettoie le cache des trucs trop anciens
			// la dernière page, si elle ne contient pas de messages, a une validité plus courte, étant susceptible d'accueillir de nouveaux posts
			if(cacheCeTopic[i][1] < Date.now() - (parseInt(i) === numDernierePage && cacheCeTopic[i][0] == "0" ? VALIDITE_CACHE_NUM_DERNIERE_PAGE_JVC : VALIDITE_CACHE_NUM_PAGES_JVC)){
				delete cacheCeTopic[i];
				cacheMaj = true;
			}
		}
		if(cacheMaj){
			localStorage.setItem(cleLocalStorage,JSON.stringify(cacheCeTopic));
		}
		let resultat = {};
		for(let i in cacheCeTopic){
			resultat[i] = cacheCeTopic[i][0];
		}
		return resultat;
	}
	
	// forcer indique si il faut nettoyer le cache même si le délai du dernier nettoyage n'est pas dépassé
	// (défaut : false)
	// à appeler de temps à autre
	nettoyerCacheNumPagesJvc(forcer){
		var dernier;
		
		// délai à calibrer avec l'usage
		if(forcer || !(dernier = localStorage.getItem('n5_cache_pages_jvc_dernier_nettoyage')) || parseInt(dernier) < Date.now() - 300000){
			for(let i in localStorage){
				if(i.indexOf('n5_cache_pages_topic_') === 0){						
					let cacheTopic = JSON.parse(localStorage[i]);
					for(let j in cacheTopic){
						if(cacheTopic[j][1] < Date.now() - VALIDITE_CACHE_NUM_PAGES_JVC){
							delete cacheTopic[j];
						}
					}
					if(Object.keys(cacheTopic).length == 0){
						localStorage.removeItem(i);
					}
					else{
						localStorage.setItem(i,JSON.stringify(cacheTopic));
					}
				}
			}
			localStorage.setItem('n5_cache_pages_jvc_dernier_nettoyage',Date.now());
		}
	}
}

class ControleurPageTopic410 extends ControleurPage{
	createManager(){
				console.log('ctrl créé');
		this.pageManager = new PageTopic410Manager();

	}
	
}

class ControleurPageRecherche extends ControleurPage{
	createManager(){
		this.pageManager = new PageRechercheManager();
	}
	bindHandlers(){
		var pMgr = this.pageManager;
		pMgr.setOnBtBannirAuteurTopicClicked(this.handlerBannirAuteurTopic);
		pMgr.setOnBtDebannirAuteurTopicClicked(this.handlerDebannirAuteurTopic);
		pMgr.setOnBtDeleteTopicClicked(this.handlerDeleteTopic);
	}
	load(){
		var pMgr = this.pageManager;
		var bornes = pMgr.getBornesTemporellesSecurisees();
		var idsTopicsJvc = pMgr.topicsData.filter(e => e.type == 'topic').map(e => e.id);
		
		Serv.getTopicsN4(pMgr.pageInfo.forumId,bornes.de,bornes.a,pMgr.pageInfo.offset == 1,idsTopicsJvc,function(errCode,msg,res){
			if(!errCode){
				pMgr.injectTopics(res.threads);
				pMgr.injectNombrePostsN4(res.nbPostsN4Jvc);
				pMgr.setNombreCoJvp(res.nombreConnectes);
				// document.dispatchEvent(new Event('jvploaded'));
			}
			else{
				pMgr.afficherMessageNotif(msg,'danger');
			}
		},pMgr.pageInfo.typeRecherche,pMgr.pageInfo.texteRecherche);
	}
}


	
/** Classes et fonctions permettant de manipuler la structure de la page **/
/** Quand JVC changera des trucs, c'est ici qu'il faudra adapter **/

class PageManager{
  constructor(){
  	this.pageInfo = this.extractPageInfo();
		this.ajouterReglesDeStyleGeneral();
		this.initialiserManagers();
		this.modifPage();
		var ceManager = this;
    window.addEventListener("hashchange",function(e){
			ceManager.reloadPage();
    });
		let curLoc = location.href;
		window.addEventListener("beforeunload",function(e){
			sessionStorage.setItem('n5_just_left',curLoc);
			sessionStorage.setItem('n5_just_left_scroll_x',window.pageXOffset);
			sessionStorage.setItem('n5_just_left_scroll_y',window.pageYOffset);
		});
  }
	
  extractPageInfo(){
		var res = {};
		res.erreurJvc = !!document.querySelector('.alert');
		res.utilisateur = this.extractUserName();
		return res;
  }

	// recharge la page ; essaie d'éviter location.reload quand la page a été requêtée à jvc
	// avec des données POST pour éviter une confirmation du navigateur "voulez-vous renvoyer le formulaire...?"
	reloadPage(){
		this.pageInfo.erreurJvc ? reloadSansPOST() : location.reload();
	}
	
	initialiserManagers(){
		// à adapter dans les classes héritantes
	}

	modifPage(){
		// à adapter dans les classes héritantes
	}

	static estTopic410(){
		return !!document.querySelector('img[alt="ERREUR 410"]');
	}
	estTopic410(){
		return PageManager.estTopic410();
	}

	// permet de remettre le scroll où il était après un refresh
	// renvoie true si un scroll précédent a effectivement été trouvé et remis
	remettreAncienScroll(){
		if(window.location.href == sessionStorage.getItem('n5_just_left')){
			let x = sessionStorage.getItem('n5_just_left_scroll_x');
			let y = sessionStorage.getItem('n5_just_left_scroll_y');
			window.scroll(x,y);
			sessionStorage.removeItem('n5_just_left');
			sessionStorage.removeItem('n5_just_left_scroll_x');
			sessionStorage.removeItem('n5_just_left_scroll_y');
			return true;
		}
		return false;
	}

	// Manipulation générale de la page

  utilisateurEstConnecte(){
		return !document.querySelector('.jv-nav-account-connect');
	}

	setNombreCoJvp(nombre){
		var span = document.querySelector('.nb-connect-fofo');
		if(span){
			span.innerHTML = span.innerHTML.replace(/^[0-9]+/,'$&<span class="nb-connect-fofo-ppp"> / ' + nombre + '</span>');
		}
	}
	
	getZoneOuMettreMessagesParDefaut(){
		return document.querySelector('.titre-head-bloc') || document.getElementById('content');
	}

	
	// modifie le titre (h2 ou équivalent) de la page
  // où sujet est un bool qui indique si le mot "sujet" en gris doit apparaître (cas des titres de topic)
	setTitre(texte,sujet){
	}

	// conteneur des posts d'une page d'un topic
	static getCtnrMessagesPagi(){
		return document.querySelector('.conteneur-messages-pagi');
	}
	getCtnrMessagesPagi(){
		return PageManager.getCtnrMessagesPagi();
	}

	// liste de topics
	getCtnrTopicsPagi(){
		return document.querySelector('.conteneur-topic-pagi');
	}

	getBlocOutilsTop(){
		return document.querySelector('.bloc-outils-top')
	}

	getBlocOutilsBottom(){
		return document.querySelector('.bloc-outils-bottom');
	}

  extractUserName(){
    return this.utilisateurEstConnecte()
			? document.querySelectorAll('.account-pseudo')[1].innerText		// trouve deux span, mais le premier a tendance à se charger avec un délai
    	: null;
  }


	// CSS

	// où règle est une règle ou un tableau de règles (mais pas plusieurs règles à la suite du genre "body{color:white;}article{background:red;}"
  ajouterReglesDeStyle(regles){
		/**/// css détecté par jvc
		// return;
		if(!this.hasOwnProperty('stylesheetN5')){
			var a = document.createElement('STYLE');
			a.appendChild(document.createTextNode(""));
			document.head.appendChild(a);
			this.stylesheetN5 = a.sheet;
		}
    if(typeof regles == 'string'){
      regles = [regles];
    }
    for(let i = 0 ; i < regles.length ; i++){
      this.stylesheetN5.insertRule(regles[i]);
    }
  }

	// CSS pour toutes pages (concerne surtout le formulaire de post)
	ajouterReglesDeStyleGeneral(){
		this.ajouterReglesDeStyle(".btn-ppp{background-color:green;border-color:darkgreen;}");
		// reproduit les autres règles de jvc concernant le bouton poster
		this.ajouterReglesDeStyle(".btn-poster-ppp{margin-right:0.75rem;border: 0.0625rem solid;border-radius:0.125rem;cursor:pointer;display:inline-block;margin-bottom:0;padding:0 2.5rem; text-align:center;vertical-align:bottom;white-space:nowrap;color:#fff;font-weight:700;height:2rem;text-transform:uppercase;font-size:0.8125rem;touch-action:manipulation;line-height:1.42857;user-select:none;overflow:visible;}");
		this.ajouterReglesDeStyle(".btn-ppp:hover{background-color:darkgreen;border-color:#004500}");
		
		this.ajouterReglesDeStyle(".msg-notif-ppp.disparait{opacity:0!important;transition:opacity 2s;}");
		
		// règles pour les icônes des posts (et, pour certaines, des topics)
		this.ajouterReglesDeStyle(".picto-msg-croix-ppp, .picto-msg-quote-ppp, .picto-msg-crayon-ppp,.picto-msg-exclam-ppp{display:inline-block;width:1rem;height:1rem}");
		this.ajouterReglesDeStyle(".picto-msg-croix-ppp span,.picto-msg-quote-ppp span, .picto-msg-crayon-ppp span, .picto-msg-exclam-ppp span{position:absolute;top:0;left:-999em;}");
																																	 
		this.ajouterReglesDeStyle(".picto-msg-croix-ppp{background:url('//static.jvc.gg/1.74.2/img/forum/icones-messages.png') -10rem 0 no-repeat;cursor:pointer;}");
		this.ajouterReglesDeStyle(".picto-msg-quote-ppp{background:url('//static.jvc.gg/1.74.2/img/forum/icones-messages.png') -1.25rem 0 no-repeat;}");
		this.ajouterReglesDeStyle(".picto-msg-crayon-ppp{background:url('//static.jvc.gg/1.74.2/img/forum/icones-messages.png') -2.5rem 0 no-repeat;}");
		this.ajouterReglesDeStyle(".picto-msg-exclam-ppp{background:url('//static.jvc.gg/1.74.2/img/forum/icones-messages.png') -6.25rem 0 no-repeat;}");
    
		this.ajouterReglesDeStyle(".invisible-ppp{display:none!important;}");
		
		this.ajouterReglesDeStyle(".nb-connect-fofo-ppp{background:rgb(82, 136, 84);border-radius:8px;padding:1px 8px 1px 5px;margin-left:4px;}");
		
		if(localStorage.getItem('n5_theme') == 'dark'){
			this.ajouterReglesDeStyle(".highlight-couleur-ppp{color:lightgreen;border-radius:8px;padding:0 6px;white-space:nowrap;}");
		}
		else{
			this.ajouterReglesDeStyle(".highlight-couleur-ppp{background:rgb(206, 240, 206);border-radius:8px;padding:0 6px;white-space:nowrap;}");
		}
	}

	// pour page d'un topic jvc ou n4
	ajouterReglesDeStylePostsN4(){
		// ajout d'un thème sombre ad hoc, pas de gestion systématique des thèmes, peut-être plus tard
		let theme = localStorage.getItem('n5_theme');
		var reglesDeStyle;
		if(theme && theme == 'dark'){
			reglesDeStyle = [
				".form-post-topic.js-form-post-topic .titre-bloc{color:green;}",
				
				".bloc-message-forum.post-ppp{background:#262626!important;border-left:3px solid rgb(79, 115, 79)!important;color:rgb(131, 199, 131)}",
				".bloc-message-forum.post-ppp:nth-of-type(2n+1){background:#262626!important;color:rgb(109, 180, 109)}",
				
				".conteneur-message-ppp .bloc-spoil-jv .txt-spoil{background:#088f00;}",
				".conteneur-message-ppp .bloc-spoil-jv .aff-spoil,.conteneur-message-ppp .bloc-spoil-jv .masq-spoil{color:rgb(131, 199, 131);}",
				
				".conteneur-message-ppp .bloc-pseudo-msg.text-user.pseudo-auth-ppp{color:rgb(6, 147, 6);}",
				".conteneur-message-ppp .bloc-pseudo-msg.text-user.pseudo-pas-auth-ppp{rgb(145, 146, 146);}",
				
				'.bloc-liste-num-page .avec-posts-ppp-ppp{border-bottom:2px solid lightgreen}',
				'.bloc-liste-num-page .page-active.avec-posts-ppp-ppp{border-bottom:2px solid #02b302}'
			];
		}
		else{
			reglesDeStyle = [
				".form-post-topic.js-form-post-topic .titre-bloc{color:green;}",
				
				// les !important ne sont là que pour supplanter ceux de risibank qui force un background blanc
				".bloc-message-forum.post-ppp{background:rgb(243, 248, 242)!important;border-color:rgb(192, 222, 174)!important;border-left:3px solid rgb(178, 207, 178)!important}",
				".bloc-message-forum.post-ppp:nth-of-type(2n+1){background:rgb(228, 242, 227)!important;}",
				
				".conteneur-message-ppp .bloc-spoil-jv .txt-spoil{background:#088f00;}",
				".conteneur-message-ppp .bloc-spoil-jv .aff-spoil,.conteneur-message-ppp .bloc-spoil-jv .masq-spoil{color:rgb(69, 108, 31);}",
				
				".conteneur-message-ppp .bloc-pseudo-msg.text-user.pseudo-auth-ppp{color:rgb(6, 147, 6);}",
				".conteneur-message-ppp .bloc-pseudo-msg.text-user.pseudo-pas-auth-ppp{color:rgb(74, 75, 77)}",
				
				'.bloc-liste-num-page .avec-posts-ppp-ppp{border-bottom:2px solid lightgreen}',
				'.bloc-liste-num-page .page-active.avec-posts-ppp-ppp{border-bottom:2px solid #02b302}'
			];
		}
		
		for(let i = 0 ; i < reglesDeStyle.length ; i++){
			this.ajouterReglesDeStyle(reglesDeStyle[i]);
		}

	}

	// pour page d'un topic n4
	ajouterReglesDeStyleUnTopicN4(){
		this.ajouterReglesDeStyle("h2.titre-bloc.titre-bloc-forum{color:green}");
		this.ajouterReglesDeStyle(".bloc-liste-num-page .page-active{background:green}");
	}

	// pour page liste des topics
	ajouterReglesDeStyleListeTopicsN4(){
		let theme = localStorage.getItem('n5_theme');
		let reglesDeStyle;
		if(theme && theme == 'dark'){
			reglesDeStyle = [
				".topic-list li.topic-ppp a.topic-title{color:darkgreen;}",
								
				".topic-list li.topic-ppp:nth-of-type(2n+1),.topic-list .ads-middle ~ li.topic-ppp:nth-of-type(2n){background:rgb(41, 49, 40);}",
				".topic-list li.topic-ppp:nth-of-type(2n),.topic-list .ads-middle ~ li.topic-ppp:nth-of-type(2n+1){background:rgb(41, 49, 40);}",
			
				".topic-list .topic-author.pseudo-auth-ppp{color:rgb(121, 121, 212)}",
				".topic-list .topic-author.pseudo-pas-auth-ppp{color:rgb(168, 168, 168);}",
				
				".separateur-liste-ppp{background-color:rgb(61, 74, 61);height:18px;padding-left:20%;cursor:pointer;font-family:Tahoma,'DejaVu Sans Condensed',Arial,Helvetica,sans-serif;color:rgb(225, 243, 225);font-weight:700;}"
			];
		}
		else{
				
			reglesDeStyle = [
				".topic-list li.topic-ppp a.topic-title{color:#137513;}",
				".topic-list li.topic-ppp a.topic-title:visited{color:#747474;}",
				
				".topic-list li.topic-ppp:nth-of-type(2n+1),.topic-list .ads-middle ~ li.topic-ppp:nth-of-type(2n){background:#fff;}",
				".topic-list li.topic-ppp:nth-of-type(2n),.topic-list .ads-middle ~ li.topic-ppp:nth-of-type(2n+1){background:rgb(242, 252, 240);}",
			
				".topic-list .topic-author.pseudo-auth-ppp{color:#0e0e83}",
				".topic-list .topic-author.pseudo-pas-auth-ppp{color:rgb(75, 76, 78);}",
				
				".separateur-liste-ppp{background-color:rgb(225, 243, 225);height:18px;padding-left:20%;cursor:pointer;font-family:Tahoma,'DejaVu Sans Condensed',Arial,Helvetica,sans-serif;color:#005900;font-weight:700;}"
				
			];
		}
		
		for(let i = 0 ; i < reglesDeStyle.length ; i++){
			this.ajouterReglesDeStyle(reglesDeStyle[i]);
		}
		
		this.ajouterReglesDeStyle('.topic-list .topic-count{width:5rem;}');
		this.ajouterReglesDeStyle('.topic-list .topic-date{width:4rem;}');
		
		// bouton switch jvc+jvp / jvp seul
		this.ajouterReglesDeStyle('.switch-mode-liste-topics{color:white;font-family:sans-serif;white-space:nowrap;border-radius:9px;cursor:pointer;}');
		this.ajouterReglesDeStyle('.switch-mode-liste-topics:hover,.switch-mode-liste-topics:active{color:white;}');
		this.ajouterReglesDeStyle('.switch-mode-liste-topics span{background:#a1a1a1;padding:1px 4px;}');
		this.ajouterReglesDeStyle('.switch-mode-liste-topics span:first-child{border-radius:4px 0 0 4px;}');
		this.ajouterReglesDeStyle('.switch-mode-liste-topics span:nth-child(2){border-radius: 0 4px 4px 0;}');
		this.ajouterReglesDeStyle('.switch-mode-liste-topics.etat-1 span:first-child{background:orange;}');
		this.ajouterReglesDeStyle('.switch-mode-liste-topics.etat-2 span:nth-child(2){background:#1ca91c;}');

	}


  // où type est "info", "success", "danger" ou "warning" (ou null/absent ; défaut 'info')
	// bloc : conteneur où mettre le message (facultatif, par défaut vers le haut de la page)
	// bas = true pour scroller de façon à avoir le msg en bas de l'écran plutôt qu'en haut) 
  afficherMessage(texte,type,bloc,bas){
		if(!bloc){
			bloc = this.getZoneOuMettreMessagesParDefaut();
		}

		if(!bloc){
			bloc = document.getElementById('content');
		}
    if(!type){
      type = "info";
		}
		var div = elementFromHtml(
		`<div class="alert alert-` + type +`">
			<button class="close" aria-hidden="true" data-dismiss="alert" type="button">×</button>
			<div class="alert-row">` + texte + `</div>
		</div>`);
		let btClose = div.querySelector('button');
		btClose.addEventListener('click',function(e){bloc.removeChild(div);});

    if(bloc.childNodes.length == 0){
      bloc.appendChild(div);
		}
    else{
      bloc.insertBefore(div,bloc.childNodes[0]);
		}

		if(bas){
			scrollToBasElem(bloc,0,50);
		}
		else{
			scrollToElem(bloc,0,-120);
		}
  }

	afficherMessagePresDuForm(texte,classe){
		this.afficherMessage(texte,classe,document.getElementById("bloc-formulaire-forum"));
	}
	
	
	
	afficherMessageNotif(texte,classe){
		if(!classe){
			classe = "info";
		}
		var blocMsg = elementFromHtml('<div style="position:fixed;top:0;right:0;width:200px;z-index:1999999988;border-top-right-radius:0;border-bottom-right-radius:0;border-top-left-radius:0;opacity:0.9;transition:opacity 2s;" class="msg-notif-ppp alert alert-' + classe + '">' + texte + '</div>');	// z-index est 1 de plus que la barre de JVC, owned
		document.getElementsByTagName('BODY')[0].appendChild(blocMsg);
		setTimeout(function(){
			blocMsg.classList.add('disparait');
			setTimeout(function(){
				blocMsg.parentNode.removeChild(blocMsg);
			},2500);
		},4000);
	}
	
	changerTheme(nomTheme){
		localStorage.setItem('n5_theme',nomTheme);
		this.reloadPage();
	}
}


class PageListeTopicsManager extends PageManager{
	
	constructor(modeListeTopics){
		super();
		this.modeListeTopics = modeListeTopics == 'full_jvp' ? 'full_jvp' : 'mix';
	}
	
  extractPageInfo(){
    var url = window.location.href;
    var res = super.extractPageInfo();

    res.type = 'liste_topics';
    let match = url.match(/^https?:\/\/(?:www\.)?jeuxvideo\.com\/forums\/0\-([0-9]+)\-[0-9]+\-[0-9]+\-[0-9]\-([0-9]+)/)
    res.forumId = match[1];
    res.offset = parseInt(match[2]);
    match = url.match(/(https?:\/\/(?:www\.)?jeuxvideo\.com\/forums\/[0-9]+\-[0-9]+\-[0-9]+\-[0-9]+\-[0-9]+\-)([0-9]+)/);
    res.urlForum = (url.substr(0,match[1].length)+'1'+url.substr(match[1].length+match[2].length)).split('?')[0].split('#')[0];
		// idéalement, le mode devrait être repris de celui passé au constructeur, mais l'impossibilité d'accéder à this avant d'appeler le constructeur parent, et donc avant de lancer cette fonction, complique les choses
		this.modeListeTopics = location.hash.indexOf('#pppf') === 0 || location.hash.indexOf('#pppt') === 0 ? 'full_jvp' : 'mix';
		if(this.modeListeTopics == 'full_jvp'){
			res.urlTopics = res.urlForum + "#pppt-{id_topic}-{offset_post}";
			let match = window.location.hash.match(/#pppf-([0-9]+)/)
			res.offsetN4 = match ? parseInt(match[1]) : 1;
			res.urlPage1Forum = res.urlForum + '#pppf';
		}
		else{
			res.urlTopics = res.urlForum + "#ppp-{id_topic}-{offset_post}";
			res.urlPage1Forum = res.urlForum;
		}
		res.urlForumN4 = res.urlForum + '#pppf-{offset_topic}';		// pour mode full_jvp, pour la pagination (liste des topics) et le retour à la liste des sujets (page un topic)
    return res;
  }

	initialiserManagers(){
		this.listeTopicsManager = new ListeTopicsManager(this.getCtnrTopicsPagi() || null,this.pageInfo.urlTopics,this.pageInfo.urlForumN4);
		this.formPostManager = new FormPostTopicManager(document.getElementById('bloc-formulaire-forum'),this.pageInfo.erreurJvc);
		var ceManager = this;
		this.formPostManager.setOnLienThemeClicked(function(nomTheme){ceManager.changerTheme(nomTheme);});
	}

	
	setTitre(texte,sujet){
		var t = document.querySelector('h2.titre-bloc.titre-bloc-forum');
    if(!t){
      return;
		}
    t.innerHTML = sujet
    							  ? ' <span>Sujet :</span> <span id="bloc-title-forum">' + texte + '</span>'		// contient des espaces insécables
    								: texte;
	}

	get pseudoAuth(){
		return this.formPostManager.pseudoAuth;
	}
	
	set pseudoAuth(pseudo){
		this.formPostManager.pseudoAuth = pseudo;
	}
	
	get topicsData(){
		return this.listeTopicsManager.topicsData;
	}
	
  modifPage(){
		super.modifPage();
		this.formPostManager.ajouterInputsN4();
		this.ajouterReglesDeStyleListeTopicsN4();
		// ajouter un bouton pour passer des posts jvc+jvp à jvp seul
		let mJvp = this.modeListeTopics == 'full_jvp';
		let classeEtat = mJvp ? 'etat-2' : 'etat-1';
		let urlAutreEtat = mJvp ? this.pageInfo.urlForum : this.pageInfo.urlForumN4.replace('{offset_topic}','1');
		let title = mJvp ? 'Clic : mélanger avec les sujets normaux' : 'Clic : ne voir que les sujets JVP';
		let bt = elementFromHtml(
`<a href="` + escapeHtml(urlAutreEtat) + `" class="switch-mode-liste-topics ` + classeEtat + `" title="` + title + `" style="float:right;">
	<span>Mix</span><span>JVP</span>
</a>`);
		// full_jvp : la pagination sera modifiée quand la réponse du serveur donnera le nombre de topics
		document.querySelector('.titre-head-bloc').appendChild(bt);
  }

	viderFormNvTopic(){
		this.formPostManager.viderForm();
  }

	getBornesTemporellesSecurisees(){
		return this.listeTopicsManager.getBornesTemporellesSecurisees();
	}

	// nombreTopicsN4Total n'est utilisé qu'en mode full_jvp, pour adapter la pagination
  injectTopics(nouveauxTopicsData,threadsSuppl,nombreTopicsN4Total){
		this.listeTopicsManager.injectTopics(nouveauxTopicsData,threadsSuppl,this.pageInfo.urlForum);
		if(this.modeListeTopics == 'full_jvp'){
			this.modifPaginationPourN4(nombreTopicsN4Total)
		}
  }

	// indique combien de posts JVP un topic JVC contient
	// nombres : tableau d'objets avec .jvcId et .nombre
	injectNombrePostsN4(nombres){
		this.listeTopicsManager.injectNombrePostsN4(nombres);
	}
	
	getInputPseudoN4(){
		return this.formPostManager.getInputPseudoN4();
	}
	
	setInputPseudoN4Value(value){
		this.formPostManager.setInputPseudoN4Value(value);
	}
	
	getInputPseudoN4Value(value){
		return this.formPostManager.getInputPseudoN4Value();
	}
	
	setInputMdpN4Value(value){
		this.formPostManager.setInputMdpN4Value(value);
	}
	
	getInputMdpN4Value(){
		return this.formPostManager.getInputMdpN4Value();
	}
	
	viderListe(){
		this.listeTopicsManager.viderListe();
	}
	
	modifPaginationPourN4(nombreTopicsTotal){
		this.listeTopicsManager.modifPaginationPourN4(this.pageInfo.offsetN4,nombreTopicsTotal);
	}


	
	// handler reçoit (texte, nomAuteur, estAuteurJvc, titreTopic)
	setOnPostButtonN4Clicked(handler){
		let ceManager = this;
		this.formPostManager.setOnPostButtonN4Clicked(function(texte,pseudoN4,titre){
			let nomAuteur;
			let estAuteurJvc;
			if(pseudoN4 === null){
				nomAuteur = ceManager.pageInfo.utilisateur;
				estAuteurJvc = true;
			}
			else{
				nomAuteur = pseudoN4;
				estAuteurJvc = false;
			}
			handler(texte,nomAuteur,estAuteurJvc,titre);
		});
	}
	
	// handler reçoit pseudo,mdp
	setOnBtAuthClicked(handler){
		this.formPostManager.setOnBtAuthClicked(handler);
	}
	
	// handler reçoit que dalle
	setOnBtDeauthClicked(handler){
		this.formPostManager.setOnBtDeauthClicked(handler);
	}
	
	// handler reçoit topicId
	setOnBtBannirAuteurTopicClicked(handler){
		this.listeTopicsManager.setOnBtBannirAuteurTopicClicked(handler);
	}
	
	// reçoit topicId
	setOnBtDebannirAuteurTopicClicked(handler){
		this.listeTopicsManager.setOnBtDebannirAuteurTopicClicked(handler);
	}
	
	// reçoit threadId,titre
	setOnBtDeleteTopicClicked(handler){
		this.listeTopicsManager.setOnBtDeleteTopicClicked(handler);
	}
}

class PageRechercheManager extends PageManager{
	modifPage(){
		super.modifPage();
		var e = document.createElement('DIV');
		e.innerText = "JVparallèle : la recherche par message n'est pas encore disponible.";
		e.style.textAlign = "center";
		var c = document.querySelector('.conteneur-topic-pagi');
		c.insertBefore(e,c.firstElementChild);
	}
	
	initialiserManagers(){
		this.listeTopicsManager = new ListeTopicsManager(this.getCtnrTopicsPagi(),this.pageInfo.urlTopics,null);
	}

  extractPageInfo(){
    var url = window.location.href;
    var res = super.extractPageInfo();

    res.type = 'recherche';
    let match = url.match(/^https?:\/\/(?:www\.)?jeuxvideo\.com\/recherche\/forums\/0\-([0-9]+)\-[0-9]+\-[0-9]+\-[0-9]\-([0-9]+)\-[0-9]+\-[^\?]*\?([^#]*)+/)
    res.forumId = match[1];
    res.offset = parseInt(match[2]);
    let queryString = match[3];
    match = queryString.match(/search_in_forum=([^&]*)&type_search_in_forum=([^&]*)/);
    res.texteRecherche = decodeURIComponent(match[1]);
    res.typeRecherche = decodeURIComponent(match[2]);
    res.urlForum = url.replace('/recherche/','/');
    match = res.urlForum.match(/(https?:\/\/(?:www\.)?jeuxvideo\.com\/forums\/[0-9]+\-[0-9]+\-[0-9]+\-[0-9]+\-[0-9]+\-)([0-9]+)/);
    res.urlForum = (res.urlForum.substr(0,match[1].length)+'1'+res.urlForum.substr(match[1].length+match[2].length)).split('?')[0].split('#')[0];

		res.urlTopics = res.urlForum + "#ppp-{id_topic}-{offset_post}";
		
    return res;
  }

	getBornesTemporellesSecurisees(){
		return this.listeTopicsManager.getBornesTemporellesSecurisees();
	}

	get topicsData(){
		return this.listeTopicsManager.topicsData;
	}

  injectTopics(nouveauxTopicsData,threadsSuppl){
		this.listeTopicsManager.injectTopics(nouveauxTopicsData,threadsSuppl,this.pageInfo.urlForum);
  }
	
	injectNombrePostsN4(nombres){
		this.listeTopicsManager.injectNombrePostsN4(nombres);
	}

	
	// reçoit topicId
	setOnBtBannirAuteurTopicClicked(handler){
		this.listeTopicsManager.setOnBtBannirAuteurTopicClicked(handler);
	}
	
	setOnBtDebannirAuteurTopicClicked(handler){
		this.listeTopicsManager.setOnBtDebannirAuteurTopicClicked(handler);
	}
	
	// reçoit id,titre
	setOnBtDeleteTopicClicked(handler){
		this.listeTopicsManager.setOnBtDeleteTopicClicked(handler);
	}
}


class PageTopicN4Manager extends PageListeTopicsManager{		// la page topic n4 est faite à partir de la page d'accueil du forum
  constructor(){
    super();
		this.pageInfo.urlPages = this.pageInfo.urlForum + (this.modeListeTopics == 'full_jvp' ? '#pppt-' : '#ppp-') + '{id_topic}-{offset_post}';
	}	

	initialiserManagers(){
		var ceMgr = this;
		this.listePostsManager = new ListePostsManager(null);		// l'élément conteneur des posts n'existe pas encore à ce stade, modifPage s'occupera de le mettre quand il sera fait
		
		this.listePostsManager.setOnLienThemeClicked(function(nomTheme){
			ceMgr.changerTheme(nomTheme);
		});
		// le formulaire est géré par listePostsManager
	}
	
	setNombreCoJvp(nombre){
		var span = document.querySelector('.nb-connect-fofo');
		if(span){
			span.innerHTML = nombre + ' connecté(s)';
		}

	}

  setTitre(texte){
    super.setTitre(texte,true);
  }

	getInputPseudoN4(){
		return this.listePostsManager.getInputPseudoN4();
	}
	
	getInputPseudoN4Value(){
		return this.listePostsManager.getInputPseudoN4Value();
	}
	
	setInputPseudoN4Value(value){
		this.listePostsManager.setInputPseudoN4Value(value);
	}
	
	setInputMdpN4Value(value){
		this.listePostsManager.setInputMdpN4Value(value);
	}
	
	getInputMdpN4Value(value){
		this.listePostsManager.getInputMdpN4Value(value);
	}
	
  modifPage(){
    // masque les boutons abonnement RSS/favoris/afficher avatars etc
    // à faire un jour : implémenter ces fonctions / tenir compte de la valeur des options
    
		var optionsCrumb = document.getElementsByClassName("options-crumb")[0];
		optionsCrumb.parentNode.removeChild(optionsCrumb);
		
	

		// le nombre de connectés sur un topic n4 n'est pas géré
    // let nbConnectes = document.querySelector('.nb-connect-fofo');
    // nbConnectes.parentNode.removeChild(nbConnectes);

		// gère la connexion : si utilisateur n'est pas connecté, on veut que, au cas où il clique sur le lien de connexion, il soit ramené ici ensuite
		// pour ça, on ajoute un hash à l'adresse cible du lien de connexion
		// sur la page de connexion, le script s'occupera de récupérer ce hash et de le passer dans un cookie au moment de l'envoi du formulaire
		// permettant à la page principale du forum (où on va être renvoyé) de le récupérer et de renvoyer vers le topic n4
		// (modifier directement l'adresse de retour dans la query string du lien de co ne fonctionne pas,
		// les cookies ne semblent pas passer vers la page de co (mais dans le sens inverse oui), et localStorage ne passe pas la transition http <-> https)
		var liens = document.querySelectorAll('a.nav-link-account');
		for(let i = 0; i < liens.length; i++){
			let lien = liens[i];
			liens[i].setAttribute('href',lien.getAttribute('href') + window.location.hash);
		}

    // si on est déjà connecté, prépare la redirection après déconnexion
		// utilise ici directement un cookie puisqu'il n'y a pas de page de déco
		// ne fonctionne plus, à examiner
    if(this.pageInfo.utilisateur !== null){
      var lienDeco = document.querySelector("a[href^='http://www.jeuxvideo.com/sso/logout.php']");
			lienDeco.addEventListener('click',function(){
        document.cookie = 'n5_disconnecting=true';
        document.cookie = 'n5_ret_hash=' + encodeURIComponent(window.location.href.split('#')[1]);
      });
    }

		// remplace le bloc bloc-outils-top ("répondre", "actualiser"...), prévu pour une liste de topics, par celui adapté à un topic seul
    var exBlocOutils = this.getBlocOutilsTop();
		let urlForum = this.pageInfo.urlPage1Forum;
		var nvBlocOutils = elementFromHtml(
		`<div class="bloc-pre-pagi-forum bloc-outils-top">  <div class="bloc-pre-left"><div class="group-one"><span class="btn btn-repondre-msg btn-ppp" id="btn-repondre-topic-ppp">Répondre</span>
</div><div class="group-two"><a href="` + urlForum + `#bloc-formulaire-forum" sl-processed="1"><!--
--><span class="btn btn-actu-new-list-forum" id="btn-nv-topic">Nouveau sujet</span></a><a href="` + urlForum + `" sl-processed="1"><!--
--><span class="btn btn-actu-new-list-forum">Liste des sujets</span><!--
--></a></div></div><div class="bloc-pre-right"><button class="btn btn-actu-new-list-forum btn-actualiser-forum">Actualiser</button></div></div>`
		);
    exBlocOutils.parentNode.replaceChild(nvBlocOutils,exBlocOutils);

		let ceManager = this;
    // handler sur le bouton "répondre"
		var nvBoutonRepondreHaut = nvBlocOutils.querySelector('#btn-repondre-topic-ppp');
		nvBoutonRepondreHaut.addEventListener("click",function(){
      document.querySelector('.bloc-outils-bottom').scrollIntoView();		// la barre de menu fixe entrave la visibilité si on scrolle pile sur le form
			ceManager.listePostsManager.getTextareaNouveauMessage().focus();

    });

		// crée le conteneur principal des messages
    var exBlocTopicsPagi = this.getCtnrTopicsPagi();
    var nvBlocMessagesPagi = document.createElement('div')
    nvBlocMessagesPagi.className = "conteneur-messages-pagi";
    nvBlocMessagesPagi.innerHTML =
`<div class="bloc-pagi-default"></div>
<div class="bloc-pagi-default"></div>
<div class="bloc-pre-pagi-forum bloc-outils-bottom">
	<div class="bloc-pre-left">
		<div class="group-two">
			<a href="` + urlForum + `#bloc-formulaire-forum" sl-processed="1">
				<span class="btn btn-actu-new-list-forum">Nouveau sujet</span>
			</a><!--
   --><a href="` + urlForum + `" sl-processed="1"><span class="btn btn-actu-new-list-forum">Liste des sujets</span></a>
    </div>
  </div>
  <div class="bloc-pre-right">
    <button class="btn btn-actu-new-list-forum btn-actualiser-forum">Actualiser</button>
  </div>
</div>`;

		// adapte le form façon "réponse à un topic" pour que le ListePostsManager puisse le gérer
		let ancienBlocForm = document.getElementById('bloc-formulaire-forum');
    nvBlocMessagesPagi.appendChild(FormPostManager.creerFormMessageApdFormTopic(ancienBlocForm));
		ancienBlocForm.parentNode.removeChild(ancienBlocForm);

		exBlocTopicsPagi.parentNode.replaceChild(nvBlocMessagesPagi,exBlocTopicsPagi);

		this.listePostsManager.bindElement(this.getCtnrMessagesPagi());
		this.listePostsManager.ajouterInputsFormN4();
		this.listePostsManager.retirerBtPosterOriginal();
		this.listePostsManager.setTitreFormPost("Répondre");
		this.listePostsManager.neutraliserSubmitFormPost();


		// handler sur boutons actualiser
    var btnsActualiser = document.getElementsByClassName('btn-actualiser-forum');
    for(let i = 0; i < btnsActualiser.length; i++){
      btnsActualiser[i].addEventListener('click',function(){
				ceManager.reloadPage();
      });
    }

		// this.listePostsManager.getTextareaNouveauMessage().focus();

		this.ajouterReglesDeStylePostsN4();
		this.ajouterReglesDeStyleUnTopicN4();

	}

  extractPageInfo(){
    var url = window.location.href;
    var res = super.extractPageInfo();


    res.type = 'topicn5';
    res.titreForum = document.getElementsByTagName('H1')[0].innerHTML;
    let match;
    res.forumId = url.match(/^https?:\/\/(?:www\.)?jeuxvideo\.com\/forums\/[0-9]+\-([0-9]+)/)[1];
    match = window.location.hash.match(/^#pppt?\-([0-9]+)\-([0-9]+)/);
    res.topicN4Id = match[1];
    res.firstPostNum = match[2];
    res.urlForum = window.location.href.split('#')[0];
    return res;
  }

	// cnt = objet (res) reçu par le serveur, inclut infos du topic (titre...) et postsdata
  injectContent(cnt){

		var escapedTitle = escapeHtml(cnt.threadInfo.titre);
    this.structurerFilAriane(escapedTitle);

    this.setTitre(escapedTitle);
    var nvTitleForum = premierCarEnMinuscule(this.pageInfo.titreForum);
    document.title = cnt.threadInfo.titre+' sur le '+nvTitleForum + ' - jeuxvideo.com';

				
  	this.listePostsManager.injectPosts(cnt.posts);
    var nvBlocPagi1 = this.genererPagination(nbPagesFromNbPosts(cnt.threadInfo.nb),cnt.threadInfo.pageActive,this.pageInfo.urlPages.replace('{id_topic}',cnt.threadInfo.id));
    var blocsPagi = document.querySelectorAll('.bloc-pagi-default');
    blocsPagi[0].style.display = 'none';
    blocsPagi[0].parentNode.insertBefore(nvBlocPagi1,blocsPagi[0]);
    blocsPagi[0].parentNode.removeChild(blocsPagi[0]);
    var nvBlocPagi2 = nvBlocPagi1.cloneNode(true);
    blocsPagi[1].style.display = 'none';
   	blocsPagi[1].parentNode.insertBefore(nvBlocPagi2,blocsPagi[1]);
    blocsPagi[1].parentNode.removeChild(blocsPagi[1]);
  }

    // transforme un fil d'ariane de liste des topics pour lui donner la structure qu'il doit avoir pour une page présentant un topic (jeuxvideo.com / Tous les forums / Forum blabla... / titre du topic
	structurerFilAriane(titreTopic){
   // à faire : pourrait être continuée pour ajouter un élément si page 2 et plus
    var urlForum = this.pageInfo.urlPage1Forum;

    var filAriane = document.querySelector('.fil-ariane-crumb');

    var exTitreAriane = filAriane.querySelector('h1');
    exTitreAriane.style.display = 'none';

		var spanLienForumAriane = elementFromHtml('<span><a><a href="' + urlForum + '">' + exTitreAriane.innerHTML + '</a></span>');
    filAriane.insertBefore(spanLienForumAriane,exTitreAriane);
    filAriane.removeChild(exTitreAriane);

    filAriane.appendChild(document.createTextNode(" / "));

		var nvTitreAriane = elementFromHtml('<h1 class="highlight">' + titreTopic + '</h1>');// document.createElement('h1');
    filAriane.appendChild(nvTitreAriane);
    }


	viderFormPost(){
		this.listePostsManager.viderFormPost();
	}

	// handler reçoit (texte,nomAuteur,estAuteurJvc)
	setOnPostButtonN4Clicked(handler){
		let ceManager = this;
		this.listePostsManager.setOnPostButtonN4Clicked(function(texte,pseudoN4){
			let nomAuteur;
			let estAuteurJvc;
			if(pseudoN4 === null){
				nomAuteur = ceManager.pageInfo.utilisateur;
				estAuteurJvc = true;
			}
			else{
				nomAuteur = pseudoN4;
				// estAuteurJvc = pseudoN4 == ceManager.pageInfo.utilisateur;
				estAuteurJvc = false;
			}
			handler(texte,nomAuteur,estAuteurJvc);
		});
	}

	// handler reçoit param (postId,postElem)
	setOnDeleteButtonN4Clicked(handler){
		this.listePostsManager.setOnDeleteButtonN4Clicked(handler);
	}

	// handler reçoit (id,nouveauTexte,postElem)
	setOnConfirmEditButtonN4Clicked(handler){
		this.listePostsManager.setOnConfirmEditButtonN4Clicked(handler);

	}

	// handler reçoit pseudo,mdp
	setOnBtAuthClicked(handler){
		this.listePostsManager.setOnBtAuthClicked(handler);
	}

	// handler reçoit rien
	setOnBtDeauthClicked(handler){
		this.listePostsManager.setOnBtDeauthClicked(handler);
	}
	
	// handler reçoit postId
	setOnBtBannirAuteurPostClicked(handler){
		this.listePostsManager.setOnBtBannirAuteurPostClicked(handler);
	}
	
	setOnBtDebannirAuteurPostClicked(handler){
		this.listePostsManager.setOnBtDebannirAuteurPostClicked(handler);
	}
	
	// reçoit postId,postElem
	setOnBtSignalerPostClicked(handler){
		this.listePostsManager.setOnBtSignalerPostClicked(handler);
	}

	get pseudoAuth(){
		return this.listePostsManager.pseudoAuth;
	}
	set pseudoAuth(pseudo){
		this.listePostsManager.pseudoAuth = pseudo;
	}

  // url prend un marqueur "{offset_post}" qui sera remplacé par la valeur appropriée
	// renvoie un div.bloc-pagi-default
	// à faire : pourait être réécrit avec plus de html
	genererPagination(nbPages,pageActive,url){

  	var divBlocPagi = document.createElement('div');
    divBlocPagi.className = 'bloc-pagi-default';

    // bts précédent/début
	  var divPagiBefore = document.createElement('div');
	  divPagiBefore.className = 'pagi-before';
	  divBlocPagi.appendChild(divPagiBefore);

    if(pageActive > 1){

	    var spanPrem = document.createElement('span');
	    divPagiBefore.appendChild(spanPrem);

	    var lienPagiDebut = document.createElement('a');
	    lienPagiDebut.className = 'xXx pagi-debut-actif';
	    lienPagiDebut.setAttribute('href',url.replace('{offset_post}','1'));
	    spanPrem.appendChild(lienPagiDebut);

	    var spanPagiDebut = document.createElement('span');
	    spanPagiDebut.innerText = 'Début';
	    lienPagiDebut.appendChild(spanPagiDebut);

  	  var spanPrec = document.createElement('span');
    	divPagiBefore.appendChild(spanPrec);

	    var lienPagiPrecedent = document.createElement('a');
	    lienPagiPrecedent.className = 'xXx pagi-precedent-actif';
	    lienPagiPrecedent.setAttribute('href',url.replace('{offset_post}',firstMessageFromPage(pageActive-1)));
	    spanPrec.appendChild(lienPagiPrecedent);

	    var spanPagiPrecedent = document.createElement('span');
	    spanPagiPrecedent.innerText = 'Page précédente';
	    lienPagiPrecedent.appendChild(spanPagiPrecedent);
    }

    // numéros de page
    var divBlocListeNumPage = document.createElement('div');

    divBlocListeNumPage.className = 'bloc-liste-num-page';
    divBlocPagi.appendChild(divBlocListeNumPage);

    var pagesMilieuMin;
    var pagesMilieuMax;

    pagesMilieuMin=3;
    pagesMilieuMax=3;
    let placeGauche = Math.min(5,pageActive-1);
    let placeDroite = Math.min(5,nbPages-pageActive);
    if(placeGauche < placeDroite){
    	pagesMilieuMin = pageActive-placeGauche;
      pagesMilieuMax = Math.min(nbPages,pagesMilieuMin+10);
    }
    else{
      pagesMilieuMax = pageActive+placeDroite;
      pagesMilieuMin = Math.max(1,pagesMilieuMax-10)

    }
    var faireLienMoins10 = pageActive > 11;
    var faireLienPlus10 = pagesMilieuMin <= nbPages - 11

    if(faireLienMoins10){
      let spanMoins10 = document.createElement('span');
      divBlocListeNumPage.appendChild(spanMoins10);

      let lienMoins10 = document.createElement('a');
      lienMoins10.className = 'lien-jv';
      lienMoins10.setAttribute('href',url.replace('{offset_post}',firstMessageFromPage(pageActive-10)));
      lienMoins10.text = "«";
      spanMoins10.appendChild(lienMoins10);
    }

    if(pagesMilieuMin > 1){
      let spanP1 = document.createElement('span');
      divBlocListeNumPage.appendChild(spanP1);

      let lienP1 = document.createElement('a');
      lienP1.className = 'lien-jv';
      lienP1.setAttribute('href',url.replace('{offset_post}','1'));
      lienP1.text = "1";
      spanP1.appendChild(lienP1);

      let txtTroisPoints1 = document.createTextNode('...');
      divBlocListeNumPage.appendChild(txtTroisPoints1);
    }
    let i;
    for(i = pagesMilieuMin; i <= pagesMilieuMax; i++){
      let spanNumPage = document.createElement('span');
      divBlocListeNumPage.appendChild(spanNumPage);
      if(pageActive == i){
        spanNumPage.className = 'page-active';
        spanNumPage.innerText = i;
      }
      else{
        let lienNumPage = document.createElement('a');
        lienNumPage.className = 'lien-jv';
        lienNumPage.setAttribute('href',url.replace('{offset_post}',firstMessageFromPage(i)));
        lienNumPage.text = i;
        spanNumPage.appendChild(lienNumPage);
      }
    }

    if(pagesMilieuMax < nbPages){
      let txtTroisPoints2 = document.createTextNode('...');
      divBlocListeNumPage.appendChild(txtTroisPoints2);
      let spanDernPage = document.createElement('span');
      divBlocListeNumPage.appendChild(spanDernPage);
      let lienDernPage = document.createElement('a');
      lienDernPage.className = 'lien-jv';
      lienDernPage.setAttribute('href',url.replace('{offset_post}',firstMessageFromPage(nbPages)));
      lienDernPage.text = nbPages;
      spanDernPage.appendChild(lienDernPage);
    }
    if(faireLienPlus10){
    	let spanPlus10 = document.createElement('span');
      divBlocListeNumPage.appendChild(spanPlus10);
      let lienPlus10 = document.createElement('a');
      lienPlus10.className = 'lien-jv';
      lienPlus10.setAttribute('href',url.replace('{offset_post}',firstMessageFromPage(pageActive+10)));
      lienPlus10.text = "»";
      spanPlus10.appendChild(lienPlus10);
    }

    // bts suivant/fin
    var divPagiAfter = document.createElement('div');
    divPagiAfter.className = 'pagi-after';
    divBlocPagi.appendChild(divPagiAfter);


    if(pageActive < nbPages){

	    var spanSuiv = document.createElement('span');
	    divPagiAfter.appendChild(spanSuiv);

	    var lienPagiSuiv = document.createElement('a');
	    lienPagiSuiv.className = 'xXx pagi-suivant-actif';
	    lienPagiSuiv.setAttribute('href',url.replace('{offset_post}',firstMessageFromPage(pageActive+1)));
	    spanSuiv.appendChild(lienPagiSuiv);

      var spanPagiSuiv = document.createElement('span');
      spanPagiSuiv.innerText = 'Page suivante';
      lienPagiSuiv.appendChild(spanPagiSuiv);

      var spanDern = document.createElement('span');
      divPagiAfter.appendChild(spanDern);

      var lienPagiFin = document.createElement('a');
      lienPagiFin.className = 'xXx pagi-fin-actif';
      lienPagiFin.setAttribute('href',url.replace('{offset_post}',firstMessageFromPage(nbPages)));
      spanDern.appendChild(lienPagiFin);

      var spanPagiFin = document.createElement('span');
      spanPagiFin.innerText = 'Fin';
      lienPagiFin.appendChild(spanPagiFin);
    }
    return divBlocPagi;
  }
}


class PageTopicJvcManager extends PageManager{
	constructor(){
		super();
		// infos supplémentaires une fois les managers chargés
		this.pageInfo.pageActuelle = this.listePostsManager.getNPageActuelle();
		this.pageInfo.datePremierPost = this.listePostsManager.getDatePremierPost();
		// this.pageInfo.dateDernierPost = this.listePostsManager.getDateDernierPost();
		}

	initialiserManagers(){
		this.listePostsManager = new ListePostsManager(null);		// le form peut avoir besoin d'être créé, dans le cas d'un topic locké
		var ceMgr = this;
		this.listePostsManager.setOnLienThemeClicked(function(nomTheme){ceMgr.changerTheme(nomTheme);});
		// listePostsManager gère aussi le formulaire
	}

	extractPageInfo(){
		var res = super.extractPageInfo();
		res.type = 'topicjvc';
		let lienArianeForum = document.querySelector('.fil-ariane-crumb span:last-of-type a');
		res.titreForum = lienArianeForum.text;
		res.urlForum = lienArianeForum.getAttribute('href');
		res.forumId = res.urlForum.match(/\/forums\/[0-9]+\-([0-9]+)/)[1];
		res.topicJvcId = window.location.href.match(/forums\/[0-9]+\-[0-9]+\-([0-9]+)/)[1];
		res.topicLock = !!document.querySelector('.message-lock-topic');
		res.nombrePages = this.getNombrePages();
		return res;
	}

	injectPosts(postsData){
		this.listePostsManager.injectPosts(postsData);
	}

	modifPage(){
		// si le topic est locké, crée un form de fortune pour pouvoir poster en mode n4
		if(this.pageInfo.topicLock){
			let msgLock = document.querySelector('.message-lock-topic');
			let exForm = document.getElementById('bloc-formulaire-forum');
			let nouveauForm = FormPostManager.creerNouveauFormMessage();
			if(exForm){
				exForm.parentNode.removeChild(exForm);		// exForm pourrait être remplacé par nvForm avec replaceChild, mais il semblerait qu'il ne soit pas forcément présent au moment où ceci s'exécute
			}
			msgLock.parentNode.insertBefore(FormPostManager.creerNouveauFormMessage(),msgLock.nextSibling);
		}

		this.listePostsManager.bindElement(this.getCtnrMessagesPagi());
		this.listePostsManager.ajouterInputsFormN4();
		this.ajouterReglesDeStylePostsN4();

		if(this.pageInfo.topicLock){
			this.listePostsManager.retirerBtPosterOriginal();
			this.listePostsManager.neutraliserSubmitFormPost();
		}
	}

	// handler reçoit les params (texte, nomAuteur, estAuteurJvc)
	setOnPostButtonN4Clicked(handler){
		let ceManager = this;
		this.listePostsManager.setOnPostButtonN4Clicked(function(texte,pseudoN4){
			let nomAuteur;
			let estAuteurJvc;
			if(pseudoN4 === null){
				nomAuteur = ceManager.pageInfo.utilisateur;
				estAuteurJvc = true;
			}
			else{
				nomAuteur = pseudoN4;
				// estAuteurJvc = pseudoN4 == ceManager.pageInfo.utilisateur;
				estAuteurJvc = false;
			}
			handler(texte,nomAuteur,estAuteurJvc);
		});
		;
	}

	// ramène les urls des autres pages visibles dans la pagination
	// sous la forme [{nPage:1,url:"http://..."},{...}]
	getUrlsPagesPagi(){
		return this.listePostsManager.getUrlsPagesPagi();
	}

	// à partir de l'url d'une page quelconque d'un topic jvc, construit l'url d'une autre page au choix
	static urlPageTopicJvc(url,nPage){
		return url && url.replace(/forums\/([0-9]+)\-([0-9]+)\-([0-9]+)\-([0-9]+)/,'forums/$1-$2-$3-' + nPage);
	}
	
	// handler reçoit (postId,postElem)
	setOnDeleteButtonN4Clicked(handler){
		this.listePostsManager.setOnDeleteButtonN4Clicked(handler);
	}

	// reçoit (id,nouveauTexte,postElem)
	setOnConfirmEditButtonN4Clicked(handler){
		this.listePostsManager.setOnConfirmEditButtonN4Clicked(handler);
	}
	
	setOnBtAuthClicked(handler){
		this.listePostsManager.setOnBtAuthClicked(handler);
	}
	
	// handler reçoit rien
	setOnBtDeauthClicked(handler){
		this.listePostsManager.setOnBtDeauthClicked(handler);
	}
	
	// handler reçoit postId
	setOnBtBannirAuteurPostClicked(handler){
		this.listePostsManager.setOnBtBannirAuteurPostClicked(handler);
	}
	
	setOnBtDebannirAuteurPostClicked(handler){
		this.listePostsManager.setOnBtDebannirAuteurPostClicked(handler);
	}

	// reçoit postId,postElem
	setOnBtSignalerPostClicked(handler){
		this.listePostsManager.setOnBtSignalerPostClicked(handler);
	}
	
	get pseudoAuth(){
		return this.listePostsManager.pseudoAuth;
	}
	set pseudoAuth(pseudo){
		this.listePostsManager.pseudoAuth = pseudo;
	}

	getNombrePages(){
		var blocPagi = document.querySelector('.bloc-liste-num-page');
		// si pagination absente
		if(!blocPagi || !blocPagi.lastElementChild){
			return 1;
		}
		var spanDernierePage = blocPagi.lastElementChild;
		if(spanDernierePage.innerText == "»"){
			return parseInt(spanDernierePage.previousElementSibling.innerText);
		}
		else{
			return parseInt(spanDernierePage.innerText);
		}
	}
	
	getUrlDernierePage(){
		return this.listePostsManager.getUrlDernierePage();
	}

	marquerNumerosPages(pages){
		this.listePostsManager.marquerNumerosPages(pages);
	}
	
	// récupère la période de temps couverte par la page d'un topic jvc, càd la date du premier message et celle du premier message de la page suivante (ou du dernier de cette page, si c'est la dernière page)
  // peut donc impliquer une requête vers JVC pour obtenir la page 2, d'où le côté asynchrone
	// renvoie un objet avec .de et .a
  getBornesTemporelles(callback){
		this.listePostsManager.getBornesTemporelles(callback);
  }

	viderFormPost(){
		this.listePostsManager.viderFormPost();
	}
	
	getInputPseudoN4(){
		return this.listePostsManager.getInputPseudoN4();
	}
	
	setInputPseudoN4Value(value){
		this.listePostsManager.setInputPseudoN4Value(value);
	}
	
	getInputPseudoN4Value(){
		return this.listePostsManager.getInputPseudoN4Value();
	}
	
	setInputMdpN4Value(value){
		this.listePostsManager.setInputMdpN4Value(value);
	}
	
	getInputMdpN4Value(){
		return this.listePostsManager.getInputMdpN4Value();
	}	
}

class PageTopic410Manager extends PageManager{
	extractPageInfo(){
		console.log('ettracing');
		var res = super.extractPageInfo();
		res.type = 'topic410';
		res.forumId = location.href.match(/\/forums\/[0-9]+\-([0-9]+)/)[1];
		res.topicJvcId = location.href.match(/forums\/[0-9]+\-[0-9]+\-([0-9]+)/)[1];
		return res;
	}
	
	modifPage(){
		var img410 = document.querySelector('img[alt="ERREUR 410"]');
		var urlTopic = location.href.match(/\/forums\/(.+)/)[1];
		// À FAIRE tester inject via query string
		var msgGoBruiter = elementFromHtml('<div class="col-md-12 text-center"><br><a href="https://bruiter.com/topic/' + urlTopic + '" target="_blank">Chercher une archive sur bruiter.com ↪</a></div>')
		img410.parentNode.parentNode.appendChild(msgGoBruiter);
	}
	
}

class PageConnexionManager extends PageManager{
	constructor(){
		super();
		// en cas de connexion, si l'utilisateur provient d'un topic n4, informe le script de la page de retour qu'il doit rediriger vers ce topic
		// code désactivé car, chose amusante, avoir le hash au bout de l'url de la page de connexion suffit, JVC le remet sur l'url de retour
		/*
    var retUrl = this.pageInfo.retHash;
    document.querySelector('.btn-valid-form').addEventListener('click',function(){		// fonctionne même qd le form est validé avec entrée
      document.cookie = 'n4_ret_hash=' + retHash;
    	document.cookie = 'n4_connecting=true';
    });
		*/
  }

  extractPageInfo(){
    var res = super.extractPageInfo();
    res.type = 'connexion';
    var hashN4 = window.location.href.split('#')[1];
		res.retHash = hashN4;

    return res;
  }
}


// gère une liste de topics sur une page
class ListeTopicsManager{
	// attend le conteneur (.conteneur-topic-pagi)
	// urlTopics pour le href des liens des topics, avec tokens, du type http://www.jeuxvideo.com/forums/0-51-0-1-0-1-0-blabla-18-25-ans.htm#jvp-{id_topic}-{offset_post}
	// urlForumN4 pour le mode 'full_jvp' et sa pagination, type http://www.jeuxvideo.com/forums/0-51-0-1-0-1-0-blabla-18-25-ans.htm#jvpf-{offset_topic}
	constructor(conteneurElem,urlTopics,urlForumN4){
		this.urlTopics = urlTopics;
		this.urlForumN4 = urlForumN4;

		this.conteneurElem = conteneurElem;

		this.estUniquePage = !conteneurElem.querySelector('.bloc-pagi-default');

		this.topicsUl = conteneurElem.querySelector('.topic-list');
		// génère la liste si elle n'existe pas (aucun topic jvc) en prévision de l'intégration de topics n4
		if(!this.topicsUl){
			let htmlListe = '<ul class="topic-list topic-list-admin"><li class="topic-head"><span class="topic-subject">Sujet</span><span class="topic-author">Auteur</span><span class="topic-count">Nb</span><span class="topic-date"> Der msg </span></li></ul>';
			let span = firstDirectChildOfType(conteneurElem,'SPAN');				// querySelector(':scope > span') n'est pas très largement supporté
			if(span){
				// idéalement, remplace juste le span qui informe que la liste est vide (laisse par exemple la mention "résultats pour la recherche de..."
				span.parentNode.insertBefore(elementFromHtml(htmlListe),span);
				span.parentNode.removeChild(span);
			}
			else{
				// sinon, au pire, remplace tout
				let htmlPagi = ('<div class="bloc-pagi-default"><div class="pagi-before"></div><div class="pagi-after"></div></div>');
				conteneurElem.innerHTML = htmlPagi + htmlListe + htmlPagi;
			}
		this.topicsUl = conteneurElem.querySelector('.topic-list');
		}
		this.topicsUl.querySelector('.topic-head .topic-date').innerHTML = "Der msg";
		this.nombreColonnes = this.topicsUl.firstElementChild.childElementCount;
	}

	modifPaginationPourN4(offsetPageActuelle,nombreTopicsTotal){
		var url = this.urlForumN4;
		var blocPagiDefault = document.createElement('DIV');
		blocPagiDefault.className = "bloc-pagi-default";
		
		var pagiBefore,pagiAfter;

		if(offsetPageActuelle <= 1){
			pagiBefore = document.createElement('DIV');
			pagiBefore.className = 'pagi-before';
		}
		else{
			let urlPgPrec = url.replace('{offset_topic}',Math.max(1,offsetPageActuelle - TOPICS_PAR_PAGE));
			let urlPremPg = url.replace('{offset_topic}','1')
			urlPgPrec = escapeHtml(urlPgPrec);
			pagiBefore = elementFromHtml(
`<div class="pagi-before">
	<span>
		<a href="` + urlPremPg + `" class="pagi-debut-actif" sl-processed="1">
			<span>Début</span>
		</a>
	</span>
	<span>
		<a href="` + urlPgPrec + `" class="pagi-precedent-actif" sl-processed="1">
			<span>Page précédente</span>
		</a>
	</span>
</div>`);
		}
		if(offsetPageActuelle <= (nombreTopicsTotal - TOPICS_PAR_PAGE)){
			let urlPgSuiv = url.replace('{offset_topic}', offsetPageActuelle + TOPICS_PAR_PAGE);
			pagiAfter = elementFromHtml(
`<div class="pagi-after">
	<span>
		<a href="` + urlPgSuiv + `" class="pagi-suivant-actif" sl-processed="1">
			<span>Page suivante</span>
		</a>
	</span>
</div>`);
		}
		else{
			pagiAfter = document.createElement('DIV');
			pagiAfter.className = "pagi-after";
		}
		
		blocPagiDefault.appendChild(pagiBefore);
		blocPagiDefault.appendChild(pagiAfter);
		
		var blocPagiDefaultBas = blocPagiDefault.cloneNode(true);
		
		var pagiEx = this.conteneurElem.querySelectorAll('.bloc-pagi-default');
		for(let i = 0 ; i < pagiEx.length ; i++){
			pagiEx[i].parentNode.removeChild(pagiEx[i]);
		}
		
		this.conteneurElem.insertBefore(blocPagiDefault,this.conteneurElem.firstChild);
		this.conteneurElem.appendChild(blocPagiDefaultBas,this.conteneurElem.firstChild);
	}
	
	get estPremierePage(){
		let p;
		return !(p = this.conteneurElem.querySelector('.pagi-before')) || !p.childElementCount;
	}

	// fournit les données des topics jvc les topics jvc, lazy
	get topicsData(){
  	if(!this.hasOwnProperty('parsedTopicsData')){
    	this.parsedTopicsData = this.parseTopicsJvc();
    }
    return this.parsedTopicsData;
	}

  // insère dans la <ul> des infos de topics passés sous forme d'un array
  // attend une liste de topicdata ordonnée par epingle (true puis false) puis par ordre décroissant de date
	// à faire / à voir : urlForum pourrait par après être supprimé si l'appelant fournit des url absolues
	injectTopics(topicsData,threadsSuppl,urlForum){
		var topicsUl = this.topicsUl;
		var topicsJvcData = this.topicsData;
		var liNodes = topicsUl.childNodes;
    var i=0;		// index dans la liste de données nouveaux topics N4
    var j=0;		// index données topics JVC
    var k=0;		// index nodes li de la ul
    var insererAvant;
    var insererAvantLi;
    var liAInserer;
		if(!threadsSuppl){
			threadsSuppl = [];
		}
    while(true){
      let aInserer = topicsData[i];
      if(!aInserer){
        break;
      }
     	// détermine l'id du topic avant lequel insérer
      while(true){
        insererAvant = topicsJvcData[j];
				if(insererAvant && insererAvant.type != 'topic'){
					continue;
				}
        if(!insererAvant || (insererAvant.epingle == aInserer.epingle && insererAvant.dernier < aInserer.dernier) || (aInserer.epingle && ! insererAvant.epingle)){
          break;
				}
        j++;
      }
      if(!insererAvant){
        topicsUl.appendChild(this.topicDataToLi(aInserer,this.nombreColonnes == 5,urlForum));
      }
      else{
				topicsUl.insertBefore(this.topicDataToLi(aInserer,this.nombreColonnes == 5,urlForum),insererAvant.domElement);
			}
      i++;
    }
		// topics supplémentaires plus anciens à afficher quand même
		if(threadsSuppl.length > 0){
			let separateur = document.createElement('DIV');
			separateur.className = 'separateur-liste-ppp';
			separateur.innerHTML = 'Topics plus anciens &nbsp;&nbsp;&nbsp;' + (localStorage.getItem('n5_threadsSupplMasques') ? '⮛' : '⮙');
			separateur.addEventListener('click',function(){
				let liTopicsSuppls = topicsUl.querySelectorAll('.topic-ppp-suppl');
				let masque = localStorage.getItem('n5_threadsSupplMasques');
				if(!masque){
					for(let i = 0 ; i < liTopicsSuppls.length ; i++){
						liTopicsSuppls[i].classList.add('invisible-ppp');
					}
				localStorage.setItem('n5_threadsSupplMasques','1');
				separateur.innerHTML = 'Topics plus anciens &nbsp;&nbsp;&nbsp;⮛';
				}
				else{
					for(let i = 0 ; i < liTopicsSuppls.length ; i++){
						liTopicsSuppls[i].classList.remove('invisible-ppp');
					}
				localStorage.setItem('n5_threadsSupplMasques','');
				separateur.innerHTML = 'Topics plus anciens &nbsp;&nbsp;&nbsp;⮙';
				}
			})
			topicsUl.appendChild(separateur);
			for(let i = 0 ; i < threadsSuppl.length ; i++){
				let li = this.topicDataToLi(threadsSuppl[i],this.nombreColonnes == 5,urlForum);
				li.classList.add('topic-ppp-suppl');
				if(localStorage.getItem('n5_threadsSupplMasques')){
					li.classList.add('invisible-ppp');
				}
				topicsUl.appendChild(li);
			}
			// ⮛ ⮙ ⮝ ⮟
		}
	}
	
	// indique combien de posts JVP un topic JVC contient
	// nombres : tableau d'objets avec .jvcId et .nombre
	injectNombrePostsN4(nombres){
		var ul = this.topicsUl;
		for(let i = 0 ; i < nombres.length ; i++){
			var li = ul.querySelector('[data-id="' + nombres[i].jvcId + '"]');
			if(li.classList.contains('topic-ppp')){
				continue;		// cas improbable mais possible où un topic jvp aurait le même id qu'un topic jvc
			}
			let spanNbr = li.querySelector('.topic-count');
			spanNbr.innerHTML = spanNbr.innerHTML.trim() + ' <span class="highlight-couleur-ppp">/ ' + nombres[i].nombre + '</span>';
		}
	}

	// crée un élément <li> à partir d'un objet contenant les informations d'un topic, pour insertion dans une liste de topics
	topicDataToLi(topicData,avecColonneSelect,urlForum){
		var urlTopics = this.urlTopics;
    var srcIconeTopic;
    var altIconeTopic;
    var titleIconeTopic;
    if(topicData.epingle){
      srcIconeTopic = urlServ + "/topic-marque-on.png";
      altIconeTopic = "";		//"Topic épinglé";			// les alt déforment la case le temps que l'image soit chargée
      titleIconeTopic = "Topic épinglé";
    }
    else if(topicData.nb > POSTS_PAR_PAGE){
      srcIconeTopic = urlServ + "/topic-dossier2.png";
      altIconeTopic = "";		//"Topic hot";
      titleIconeTopic = "Topic hot";
    }
    else{
      srcIconeTopic = urlServ + "/topic-dossier.png";
      altIconeTopic = "";		//"Topic";
      titleIconeTopic = "Topic";
    }
		var hashLiensTopics = this.modeListeTopics == 'full_jvp' ? '#pppt' : '#ppp';
		var urlTopic = urlTopics.replace('{id_topic}',topicData.id).replace('{offset_post}',1);
		var urlDernierePage = urlTopics.replace('{id_topic}',topicData.id).replace('{offset_post}',firstPostFromPagePost(topicData.nb));
		var escapedTitle = escapeHtml(topicData.titre);

    var li = document.createElement('LI');
    li.dataset.id = topicData.id;
		li.className = "topic-ppp";
    li.innerHTML =
`<span class="topic-subject">
	<img class="topic-img" src="` + srcIconeTopic + `" alt="` + altIconeTopic + `" title="` + titleIconeTopic + `">
	<a class="lien-jv topic-title" href="` + urlTopic + `" title="` + escapedTitle + `">` + escapedTitle + `</a>`
	+ (topicData.supprimable
	? `<span class="picto-msg-croix-ppp" style="position:absolute;right:2px;top:2px;"></span>`
	: ``
	)
+ `</span>`
+ (topicData.estAuteurJvc
	? `<a class="xXx text-user topic-author` + (topicData.estPseudoAuth ? ` pseudo-auth-ppp`: ` pseudo-pas-auth-ppp`) + `" href="http://www.jeuxvideo.com/profil/` + topicData.nomAuteur.toLowerCase() + `?mode=infos" target="_blank">` + topicData.nomAuteur + `</a>`
	: `<span class="xXx text-user topic-author` + (topicData.estPseudoAuth ? ` pseudo-auth-ppp`: ` pseudo-pas-auth-ppp`) + `">` + topicData.nomAuteur + `</span>`
) +
`<span class="topic-count">` + (topicData.nb-1) + `</span>
<span class="topic-date">`
+ (topicData.dernier
	? `<a class="xXx lien-jv" href="` + urlDernierePage + `">` + formatDateToJVC(topicData.dernier) + `</a>`
	: ``
) +
	
`</span>`;
    if(avecColonneSelect){
      let s = document.createElement('SPAN');
      s.className = 'topic-select';
      li.appendChild(s);
    }
		// bt bannir
		if(topicData.afficherEstBanni){
			let imgEstBan = elementFromHtml('<img src="' + IMG_INTERDIT + '" alt="Banni" title="Cet utilisateur est banni." style="margin-left:4px;">');
			li.querySelector('.text-user.topic-author').appendChild(imgEstBan);
		}
		if(topicData.peutEtreBanni){
			let imgBan = elementFromHtml('<img src="' + IMG_LIGHTNING + '" alt="Bannir" title="Bannir" style="margin-left:4px;cursor:pointer">');			
			li.querySelector('.text-user.topic-author').appendChild(imgBan);
			let ceManager = this;
			imgBan.addEventListener('click',function(){
				if(ceManager.onBtBannirAuteurTopicClicked){
					ceManager.onBtBannirAuteurTopicClicked(topicData.id);
				}
			});
		}
		if(topicData.peutEtreDebanni){
			let imgDeban = elementFromHtml('<img src=" ' + IMG_RESTORE + '" alt="Débannir" title="Débannir" style="margin-left:4px;cursor:pointer;">');
			li.querySelector('.text-user.topic-author').appendChild(imgDeban);
			let ceManager = this;
			imgDeban.addEventListener('click',function(){
				if(ceManager.onBtDebannirAuteurTopicClicked){
					ceManager.onBtDebannirAuteurTopicClicked(topicData.id);
				}
			});
		}
		if(topicData.supprimable){
			let imgSuppr = li.querySelector('.picto-msg-croix-ppp');
			let ceManager = this;
			imgSuppr.addEventListener('click',function(){
				if(ceManager.onBtDeleteTopicClicked){
					ceManager.onBtDeleteTopicClicked(topicData.id,topicData.titre);
				}
			});
		}
		return li;
	}
	
	// ressemble à la précédente, mais pour un résultat message sur la page de recherche par message
	postDataToLi(postData,avecColonneSelect,urlForum){
		var urlTopics = this.urlTopics;
		var hashLiensTopics = this.modeListeTopics == 'full_jvp' ? '#pppt' : '#ppp';
		// à adapter pour arriver sur la page du message :
		var urlTopic = urlTopics.replace('{id_topic}',postData.id).replace('{offset_post}',1);
		var escapedTitle = topicData.titre;		// le titre est échappé par le serveur

    var li = document.createElement('LI');
		li.className = "message message-ppp";
    li.innerHTML =
`<span class="topic-subject">
  <a href="${urlTopic}" class="topic-title icon-down-right-arrow">${postData.texte}</a>
</span>`
+ (topicData.postEstAuteurJvc
	? `<a href="http://www.jeuxvideo.com/profil/${topicData.nomAuteur.toLowerCase()}?mode=infos" target="_blank" class="xXx topic-author text-auteur text-user ${topicData.estPseudoAuth ? 'pseudo-auth-ppp' : 'pseudo-pas-auth-ppp'}">${topicData.nomAuteur}</a>`
	: `<span class="xXx topic-author text-auteur text-user ${topicData.estPseudoAuth ? 'pseudo-auth-ppp' : 'pseudo-pas-auth-ppp'}">${topicData.nomAuteur}</span>`
) +
`<span class="topic-count no-nb"></span>
<span class="topic-date">
<a href="${urlTopic}" class="xXx lien-jv" >${formatDateToJVC(topicData.dernier)}</a>
</span>`;

    if(avecColonneSelect){
      let s = document.createElement('SPAN');
      s.className = 'topic-select';
      li.appendChild(s);
    }
		// pas de bouton admin ici (pour le moment)

		return li;
		
	}
	
/*
	// Détermine quel intervalle de temps est couvert par la liste des topics, pour récupérer les topics N4 correspondants
	// ajoute avant le début et après la fin un intervalle égal au plus grand intervalle séparant deux topics affichés, ceci visant à diminuer le risque que des topics N4 plus anciens que dernier message de la page 1 mais plus récents que le premier message de la page 2 soient inaccessibles, cachés entre deux pages (méthode faillible mais qui ne devrait pas être un problème sur un forum assez actif, l'alternative plus sûre mais plus lente étant de faire une requête sur la page suivante)
	getBornesTemporellesSecurisees(){
		if(this.estUniquePage){
			return {de:new Date(1980,0),a:getDemain()};
		}
		var topicsData = this.topicsData.filter(a => a.type == 'topic');

		
		// cas à tester : si il n'y a que des topics épinglés (peut arriver lors d'une recherche)
		
		
		while(i<topicsData.length && (topicsData[i].epingle || topicsData[i].type != 'topic')){
			i++;
		}
		

		var plusRecent = this.estPremierePage || i >= topicsData.length ? getDemain() : topicsData[i].dernier;
		var plusAncien = i >= topicsData.length ? new Date(2000,0,1) : topicsData[topicsData.length-1].dernier;
		var plusGrandIntervalle = 0;
		for(i++ ; i < topicsData.length ; i++){
			// à corr : .dernier peut être null, la date n'est pas indiquée dans la page recherche par message
			console.log('data[i]',topicsData[i]);
			let intervExamine = topicsData[i-1].dernier.getTime() - topicsData[i].dernier.getTime();
			if(intervExamine > plusGrandIntervalle){
				plusGrandIntervalle = intervExamine;
			}
		}
		return {de:new Date(plusAncien.getTime() - plusGrandIntervalle), a:new Date(plusRecent.getTime() + plusGrandIntervalle)};
	}
*/
	// Détermine quel intervalle de temps est couvert par la liste des topics, pour récupérer les topics N4 correspondants
	// ajoute avant le début et après la fin un intervalle égal au plus grand intervalle séparant deux topics affichés, ceci visant à diminuer le risque que des topics N4 plus anciens que dernier message de la page 1 mais plus récents que le premier message de la page 2 soient inaccessibles, cachés entre deux pages (méthode faillible mais qui ne devrait pas être un problème sur un forum assez actif, l'alternative plus sûre mais plus lente étant de faire une requête sur la page suivante)
	getBornesTemporellesSecurisees(){
		if(this.estUniquePage){
			return {de:new Date(1980,0),a:getDemain()};
		}
		var topicsData = this.topicsData.filter(a => a.type == 'topic');

		var i = 0;
		while(i<topicsData.length && topicsData[i].epingle){
			i++;
		}

		var plusRecent = this.estPremierePage || i >= topicsData.length ? getDemain() : topicsData[i].dernier;
		var plusAncien = i >= topicsData.length ? new Date(2000,0,1) : topicsData[topicsData.length-1].dernier;
		var plusGrandIntervalle = 0;
		i++;
		for(i++ ; i < topicsData.length ; i++){
			let intervExamine = topicsData[i-1].dernier.getTime() - topicsData[i].dernier.getTime();
			if(intervExamine > plusGrandIntervalle){
				plusGrandIntervalle = intervExamine;
			}
		}
		return {de:new Date(plusAncien.getTime() - plusGrandIntervalle), a:new Date(plusRecent.getTime() + plusGrandIntervalle)};
	}

	parseTopicsJvc(){
		var topicsUl = this.topicsUl;

    var nodesTopics = topicsUl.getElementsByTagName('li');
    var parsedData = [];
    var epinglesFinis = false;
		var topicSansDate;
  	for(let i=0; i < nodesTopics.length; i++){
      let itemLi = nodesTopics[i];
			let estTopic = itemLi.dataset && itemLi.dataset.id;
			let estMessage = itemLi.classList.contains("message");
			if(!estTopic && !estMessage){
				continue;
			}
			let dataCetItem = {};
			let nodesTopic = itemLi.childNodes;

      if(estTopic){
				dataCetItem.type = "topic";
				dataCetItem.id = itemLi.dataset.id;
				dataCetItem.epingle = false;

				for(let j=0; j < nodesTopic.length; j++){
					let subNodeTopic = nodesTopic[j];
					let classesSubNode = subNodeTopic.classList;
					if(!classesSubNode){
						continue;
					}
					if(classesSubNode.contains('topic-author')){
						dataCetItem.auteur = subNodeTopic.innerText.trim();
					}
					else if(classesSubNode.contains('topic-count')){
						dataCetItem.nb = parseInt(subNodeTopic.innerText.trim());
					}
					else if(classesSubNode.contains('topic-date')){
						dataCetItem.dernier = parseT(subNodeTopic.innerText.trim());
						// dans la liste des résultats de recherche par message, la date des topic n'est pas indiquée
						// on indique alors (a posteriori, lors de la boucle suivante) la date de l'élément suivant (qui est l'extrait du post trouvé par la recherche)
						if(!dataCetItem.dernier){
							topicSansDate = dataCetItem;
						}
					}
					else if(!epinglesFinis && classesSubNode.contains('topic-subject')){
						// let img = firstDirectChildOfType(subNodeTopic,'IMG');	// incompatible avec Spawnkill qui change un peu la structure de certains li
						let img = subNodeTopic.getElementsByTagName('IMG')[0];
						if(img.getAttribute('src').indexOf('/img/forums/topic-marque') == 0){
							dataCetItem.epingle = true;
						}
						else{
							epinglesFinis = true;
						}
					}
				}
			}
			else{			// estMessage
				dataCetItem.type = "message";
				dataCetItem.auteur = itemLi.querySelector('.topic-author').innerText.trim();
				dataCetItem.timestamp = parseT(itemLi.querySelector('.topic-date').innerText.trim());
				if(topicSansDate){
					topicSansDate.dernier = dataCetItem.timestamp;
					topicSansDate = null;
				}
			}
			
			dataCetItem.domElement = itemLi;
			parsedData.push(dataCetItem);
    }
		console.log('PARSER TOPICS',parsedData);
		return parsedData;
	}
	
	viderListe(){
		var ul = this.topicsUl;
		var ligneEnTete = ul.firstElementChild;
		ul.innerHTML = "";
		ul.appendChild(ligneEnTete);
		
		
		
	}
	

	
	// handler reçoit topicId
	setOnBtBannirAuteurTopicClicked(handler){
		this.onBtBannirAuteurTopicClicked = handler;
	}
	
	// topicId
	setOnBtDebannirAuteurTopicClicked(handler){
		this.onBtDebannirAuteurTopicClicked = handler;
	}
	
	// threadId,titre
	setOnBtDeleteTopicClicked(handler){
		this.onBtDeleteTopicClicked = handler;
	}
}


// pour gérer une page d'un topic
// gère aussi le formulaire sous la liste
class ListePostsManager{
	constructor(conteneurElem){		// .conteneur-messages-pagi
		if(conteneurElem){
			this.bindElement(conteneurElem);
		}
	}

	bindElement(conteneurElem,rechargerSansPOST){
		this.conteneurElem = conteneurElem;
		this.formPostManager = new FormPostManager(conteneurElem.querySelector('#bloc-formulaire-forum'));
		if(this.onLienThemeClicked){
			this.formPostManager.setOnLienThemeClicked(this.onLienThemeClicked);
		}
	}

	get estPremierePage(){
		// return !this.conteneurElem.querySelector('span.page-active').previousSibling;
		var spanPgAct = this.conteneurElem.querySelector('span.page-active');
		return !(spanPgAct && spanPgAct.previousSibling);
	}
	
	getNPageActuelle(){
		var spanPgAct = this.conteneurElem.querySelector('span.page-active');
		return (spanPgAct && spanPgAct.innerText) || 1;
	}

	getInputPseudoN4(){
		return this.formPostManager.getInputPseudoN4();
	}
	
	getInputPseudoN4Value(){
		return this.formPostManager.getInputPseudoN4Value();
	}
	
	setInputPseudoN4Value(value){
		this.formPostManager.setInputPseudoN4Value(value);
	}
	
	getInputMdpN4Value(){
		return this.formPostManager.getInputMdpN4Value();
	}
	
	setInputMdpN4Value(value){
		this.formPostManager.setInputMdpN4Value(value);
	}

	ajouterInputsFormN4(){
		this.formPostManager.ajouterInputsN4();
	}

	retirerBtPosterOriginal(){
		this.formPostManager.retirerBtPosterOriginal();
	}

	setTitreFormPost(titre){
		this.formPostManager.setTitre(titre);
	}
	
	// met la classe 'avec-posts-jvp-n4' sur les span (pas les a) des numéros de pages indiqués
	// pages est un objet du type {"1":0,"2":0,"3":1,"4":0...}
	marquerNumerosPages(pages){
		var blocsPagi = this.conteneurElem.querySelectorAll('.bloc-liste-num-page');
		if(blocsPagi.length == 0){
			return;
		}
		for(let i = 0 ; i < blocsPagi.length ; i++){
			let spansNumeros = blocsPagi[i].getElementsByTagName('span')
			for(let j = 0 ; j < spansNumeros.length ; j++){
				let spanNumero = spansNumeros[j];
				for(let k in pages){
					if(spanNumero.innerText == k && pages[k]){
						spanNumero.classList.add('avec-posts-ppp-ppp');
						break;
					}
				}
			}
		}
	}


	// ramène les urls des pages visibles dans la pagination, dans l'ordre
	// (y compris la page courante, mais dans ce cas l'url est null)
	// sous la forme [{nPage:"1",url:"http://..."},{...}]
	// pour cette fonction comme pour le reste du script, les numéros de page sont des strings et pas des int
	getUrlsPagesPagi(){
		let blocPagi = this.conteneurElem.querySelector('.bloc-liste-num-page');
		var spansPages = blocPagi && blocPagi.getElementsByTagName('span');
		if(!spansPages){
			return {};
		}
		var resultat = [];
		for(let i = 0 ; i < spansPages.length ; i++){
			let spanPage = spansPages[i];
			let txtLien = spanPage.innerText;
			if(txtLien.match(/^[0-9]+$/)){
				let lien = spanPage.getElementsByTagName('a')[0];
				let url = lien ? lien.href : null;
				resultat.push({nPage:txtLien,url:url});
			}
		}
		return resultat;
	}
	
	getUrlPageSuivante(){
		var spanPageActive = this.conteneurElem.querySelector('.page-active');
		if(!spanPageActive){
			return null;
		}
		var lienPageSuivante = spanPageActive.nextSibling;
		if(!lienPageSuivante){
			return null;
		}
		return lienPageSuivante.firstChild.href;
	}
	
	getUrlDernierePage(){
		var spanDer = this.conteneurElem.querySelector('.page-active');		// entre autres possibilités, la pagination n'apparaît pas quand on est sur un topic qu'on vient de créer
		if(!spanDer){
			return null;
		}
		var lienDer = spanDer.parentNode.lastChild;
		if(!lienDer){
			return null;
		}
		if(lienDer.innerText == "»"){
			lienDer = lienDer.previousElementSibling;
		}
		if(lienDer.className == "page-active"){
			return window.location.href;
		}
		else{
			return lienDer.firstChild.href;
		}
	}
	

	neutraliserSubmitFormPost(){
		this.formPostManager.neutraliserSubmitForm();
	}

	parsePostsJvc(){
		var conteneur = this.conteneurElem;
		var postElems = conteneur.querySelectorAll('.bloc-message-forum');
		var parsedData = [];
		for(let i = 0 ; i < postElems.length ; i++){
			parsedData.push(this.parseUnPost(postElems[i]));
		}
	return parsedData;
	}
	
	parseUnPost(postElem){
		let dataCePost = {};
		dataCePost.id = postElem.dataset.id;

		let blocHeaderElem = postElem.querySelector('.conteneur-message > .inner-head-content > .bloc-header');
		dataCePost.nomAuteur = blocHeaderElem.querySelector('.bloc-pseudo-msg').innerText;		// ne pas se fier à .text-user, qui n'est pas présent pour les pseudos supprimés

		let blocDate = blocHeaderElem.querySelector('.bloc-date-msg');
		let texteTstamp;
		if(blocDate.firstElementChild && blocDate.firstElementChild.tagName == 'A'){
			// utilisateur existant, la date est un lien
			texteTstamp = blocDate.querySelector('a').text.trim();
		}
		else{	// utilisateur supprimé, la date est du texte
			texteTstamp = blocDate.innerHTML.trim();
		}
		dataCePost.timestamp = parseTLong(texteTstamp);

		let zoneLastEdit = postElem.querySelector('.info-edition-msg');
		if(zoneLastEdit){
			// innerText ne marche pas à tous les coups
			let match = zoneLastEdit.innerHTML.trim().match(/[0-9]{1,2} [^ ]+ [0-9]{4}[^0-9]+[0-9]{2}:[0-9]{2}:[0-9]{2}/);
			dataCePost.lastEdit = match && parseTLong(match[0]);
		}
		else{
			dataCePost.lastEdit = null;
		}
		dataCePost.domElement = postElem;
		return dataCePost;
	}

	get postsData(){
  	if(!this.hasOwnProperty('parsedPostsData')){
    	this.parsedPostsData = this.parsePostsJvc();
    }
    return this.parsedPostsData;
	}

	injectPosts(nvPosts){
							
		var ancPosts = this.postsData;
		var conteneur = this.conteneurElem;
		let iAnc = 0;
		let iNv = 0;
		while(iAnc < ancPosts.length){
			while(iNv < nvPosts.length){
				if(nvPosts[iNv].timestamp < ancPosts[iAnc].timestamp){

					ancPosts[iAnc].domElement.parentNode.insertBefore(this.postDataToElem(nvPosts[iNv]),ancPosts[iAnc].domElement);
					iNv++;
				}
				else{
					break;
				}
			}
		iAnc++;
		}
		
		// insère à la fin les derniers posts qui n'auraient pas été insérés avant un post original car plus tardifs
		let insererAvant = this.conteneurElem.querySelector('.bloc-outils-plus-modo.bloc-outils-bottom') || this.conteneurElem.querySelectorAll('.bloc-pagi-default')[1];
		while(iNv < nvPosts.length){
			console.log('injectinge avant',insererAvant );
			conteneur.insertBefore(this.postDataToElem(nvPosts[iNv]),insererAvant);
			iNv++;
		}
		
		// ajoute un handler pour pouvoir afficher les citations imbriquées
		let citMasq = document.querySelectorAll('.post-ppp blockquote.blockquote-jv:not([data-visible="1"])');
		for(let i = 0 ; i < citMasq.length ; i++){
			citMasq[i].addEventListener('click',function(e){
				this.dataset.visible = "1";
			});
		}
	}

	// à partir des informations d'un post telles que récupérées depuis le serveur, crée un élément html à insérer dans la liste de réponses (actuellement une div.bloc-message-forum)
	postDataToElem(postData){
		console.log('TOELEM');
		// ne fait pas le bloc-message-forum-anchor
    var divBlocMessageForum = document.createElement('div');
    divBlocMessageForum.className = 'bloc-message-forum post-ppp';
		divBlocMessageForum.dataset.idN5 = postData.id;
		let adresseProfilAuteur = postData.estAuteurJvc
																? "http://www.jeuxvideo.com/profil/" + postData.nomAuteur.toLowerCase() + "?mode=infos"
																: "#";
		let avatarAuteur = postData.avatarAuteur || imgAvatarDefaut;
		// reprend la structure de jvc, ajoute/change quelques classes pour le style et pour que le JS de jvc ne reconnaisse pas les icônes citer/supprimer/etc
		// ne met pas d'alt sur les images d'avatar pour éviter une déformation le temps que l'image soit chargée
    divBlocMessageForum.innerHTML =
`<div class="conteneur-message conteneur-message-ppp">
	<div class="bloc-avatar-msg">
		<div class="back-img-msg">
			<div>`
				+ (postData.estAuteurJvc ?
				`<a class="xXx" href="` + adresseProfilAuteur + `" target="_blank">
					<img class="user-avatar-msg" src="` + avatarAuteur + `" alt="` + ''/*postData.nomAuteur*/ + `" onerror="this.src='http://image.jeuxvideo.com/avatar-sm/default.jpg';">
				</a>`
				:
				`<span class="xXx">
					<img class="user-avatar-msg" src="` + avatarAuteur + `" alt="` + ''/*postData.nomAuteur*/ + `" onerror="this.src='http://image.jeuxvideo.com/avatar-sm/default.jpg';">
				</span>`
				) +
			`</div>
		</div>
	</div>
	<div class="inner-head-content">
		<div class="bloc-header">`
			+ (postData.afficherEstBanni ? `<img src="` + IMG_INTERDIT + `" alt="Banni" title="Cet utilisateur est banni." style="display:inline-block;float:left;position:relative;top:0.9rem;left:49px">`  : ``)
		  + (postData.estAuteurJvc ?
			`<a class="xXx bloc-pseudo-msg text-user` + (postData.estPseudoAuth ? ` pseudo-auth-ppp` : ` pseudo-pas-auth-ppp`) + `" href="` + adresseProfilAuteur + `" target="_blank">` + postData.nomAuteur + `</a>
			<div class="bloc-mp-pseudo">
				<a class="xXx" href="http://www.jeuxvideo.com/messages-prives/nouveau.php?all_dest=` + postData.nomAuteur + `" target="_blank">
					<span class="picto-msg-lettre" title="Envoyer un message privé">
						<span>MP</span>
					</span>
				</a>
			</div>`
			:
			`<span class="xXx bloc-pseudo-msg text-user` + (postData.estPseudoAuth ? ` pseudo-auth-ppp` : ` pseudo-pas-auth-ppp` ) + `">` + postData.nomAuteur + `</span>`
			)
			+ (postData.peutEtreBanni ? ` <img class="lien-ban-ppp" src="` + IMG_LIGHTNING + `" style="display:block;position:relative;top:0.8rem;left:4px;float:left;cursor:pointer;" alt="Bannir" title="Bannir">` : ``)
			+ (postData.peutEtreDebanni ? `<img class="lien-deban-ppp" src="` + IMG_RESTORE + `" style="display:block;position:relative;top:0.8rem;left:4px;float:left;cursor:pointer;" alt="Débannir" title="Débannir">` : ``)
			+ `<div class="bloc-options-msg">
				<span class="picto-msg-quote-ppp" title="Citer">
					<span>Citer</span>
				</span>`
				+ (postData.editable ?
				`<span class="picto-msg-crayon-ppp" title="Éditer">
					<span>Éditer</span>
				</span>`
				: ``)
				+ (postData.supprimable ?
				`<span class="picto-msg-croix-ppp" title="Supprimer">
					<span>Supprimer</span>
				</span>`
				:``)
				+ (postData.signalable ?
				`<span class="picto-msg-exclam-ppp" title="Faire un signalement"></span>`
				: ``)
			+ `</div>
			<div class="bloc-date-msg">
				<span class="xXx lien-jv">` + formatDateToJVCLong(postData.timestamp) + `</span>
			</div>
		</div>
		<div>
			<div class="txt-msg text-enrichi-forum">` + postData.html + `</div>`
			+ (postData.lastEdit ?
			`<div class="info-edition-msg">
          Message édité le ` + formatDateToJVCLong(postData.lastEdit)// + ` par <a href="` + adresseProfilAuteur + `" target="_blank" class="xXx ">` + postData.nomAuteur + `</a>`	// on ne gère pas les éditions faites par quelqu'un d'autre ni par l'auteur sous un autre pseudo, donc réafficher le pseudo de l'auteur ici n'a pas grand intérêt
			+`</div>`
			:``) +
		`</div>
	</div>
</div>`;
    // à faire un jour : lien vers message seul (sur la date)

		// gère le bouton citer
		// à faire, pour la citation : ne pas garder les sauts de ligne multiples & ne pas mettre un saut de ligne avant la citation si la textarea ne contient rien
		var textAreaMsg = this.formPostManager.getTextareaNouveauMessage();
    if(textAreaMsg){
      let txtQuote = "\n> Le "+formatDateToJVCLong(postData.timestamp) + " "+postData.nomAuteur+' a écrit :\n';
      txtQuote += textToCitation(postData.texte) + "\n";											// + accessoire : ne pas garder les sauts de ligne multiples & ne pas mettre un saut de ligne avant la citation si la textarea ne contient rien
      divBlocMessageForum.querySelector('.picto-msg-quote-ppp').addEventListener('click',function(e){
				e.preventDefault();
        textAreaMsg.value += txtQuote;
        textAreaMsg.setSelectionRange(textAreaMsg.value.length,textAreaMsg.value.length);
        textAreaMsg.focus();
      });
    }
		// gère le bouton supprimer, si il est là
		let ceManager = this;
		if(postData.supprimable){
			divBlocMessageForum.querySelector('.picto-msg-croix-ppp').addEventListener('click',function(e){
				e.preventDefault();
				if(ceManager.onDeleteButtonN4Clicked){
					ceManager.onDeleteButtonN4Clicked(postData.id,divBlocMessageForum);
				}
			});
		}
		// et le bouton edit
		if(postData.editable){
			divBlocMessageForum.querySelector('.picto-msg-crayon-ppp').addEventListener('click',function(e){
				e.preventDefault();
				ceManager.lancerEdition(divBlocMessageForum,postData.texte);
			});
		}
		// et le bouton bannir
		if(postData.peutEtreBanni){
			divBlocMessageForum.querySelector('.lien-ban-ppp').addEventListener('click',function(e){
				e.preventDefault();
				if(ceManager.onBtBannirAuteurPostClicked){
					ceManager.onBtBannirAuteurPostClicked(postData.id);
				}
			});
		}
		// et le bouton débannir
		if(postData.peutEtreDebanni){
			divBlocMessageForum.querySelector('.lien-deban-ppp').addEventListener('click',function(e){
				e.preventDefault();
				if(ceManager.onBtDebannirAuteurPostClicked){
					ceManager.onBtDebannirAuteurPostClicked(postData.id);
				}
			});
		}
		// et le bouton signaler
		if(postData.signalable){
			divBlocMessageForum.querySelector('.picto-msg-exclam-ppp').addEventListener('click',function(e){
				if(ceManager.onBtSignalerPostClicked){
					ceManager.onBtSignalerPostClicked(postData.id,divBlocMessageForum);
				}
			});
		}
		
		
		console.log('FIN TOELEM');
		// non implémentés : blacklist, signalement, indication édité par...
		return divBlocMessageForum;

	}

	// textOrig est le texte original du post ('jvcode' non transformé en html)
	lancerEdition(postElem,texteOrig){
		// si il y a déjà une édition en cours, elle doit être annulée
		if(this.editionEnCours){
			simulerClicSur(this.conteneurElem.querySelector('#bouton-annuler-edit-ppp'));
		}
		// sauvegarde le html du message affiché
		var ancienneZoneContenu = postElem.querySelector('.txt-msg.text-enrichi-forum');
		var nouvelleZoneContenu = document.createElement('DIV');

		// obtenir un nouveau form d'édition avec les outils pour le formatage et tout est un peu compliqué, donc on va se contenter de déplacer le formulaire de nouveau post
		var editeur = this.formPostManager.getEditeur();
		var textareaEdition = editeur.querySelector('textarea');
		var texteOriginalFormPost = textareaEdition.value;;

		textareaEdition.value = texteOrig;
		nouvelleZoneContenu.appendChild(editeur);

		// ajoute les boutons confirmer et annuler
		var zoneBoutonsEdition = elementFromHtml(
`<div class="col-md-12 bloc-editor-forum" style="margin-bottom:16px">
   <button class="btn btn-editer-msg js-edit-message" type="button" id="bouton-confirmer-edit"><span class="icon-arrow-right-entypo"></span> Confirmer</button>
   <button class="btn btn-annuler-modif-msg" id="bouton-annuler-edit"><span class="icon-arrow-right-entypo"></span> Annuler</button>
</div>`)
		var btConfirmer = zoneBoutonsEdition.querySelector('#bouton-confirmer-edit');
		var btAnnuler = zoneBoutonsEdition.querySelector('#bouton-annuler-edit');

		// on ne montre pas les boutons du form pour poster, l'éditeur étant actuellement réquisitionné pour l'édition...
		this.formPostManager.masquerZoneBoutonsPoster();
		// mais ajoute un bouton "annuler l'édition" à la place de l'ancien bouton poster, pour le confort
		var btAnnulerDeFormPost = btAnnuler.cloneNode(true);
		btAnnulerDeFormPost.innerText = "Annuler l'édition pour poster";
		btAnnulerDeFormPost.setAttribute('type','button');
		let zoneBoutonsFormPoster = this.formPostManager.getZoneBoutonsPoster();
		zoneBoutonsFormPoster.parentNode.insertBefore(btAnnulerDeFormPost,zoneBoutonsFormPoster);

		let ceManager = this;

		// gestionnaires d'évènements sur les boutons
		btConfirmer.addEventListener('click',function(e){
			let idN4 = postElem.dataset.idN5;
			let nouveauTexte = textareaEdition.value;
			if(ceManager.onConfirmEditButtonN4Clicked){
				ceManager.onConfirmEditButtonN4Clicked(idN4,nouveauTexte,postElem);
			}
		});

		var handlerAnnulationEdition = function(e){
			e.preventDefault();
			textareaEdition.value = texteOriginalFormPost;
			ceManager.formPostManager.putEditeur(editeur);
			nouvelleZoneContenu.parentNode.replaceChild(ancienneZoneContenu,nouvelleZoneContenu);
			ceManager.formPostManager.reafficherZoneBoutonsPoster();
			btAnnulerDeFormPost.parentNode.removeChild(btAnnulerDeFormPost);
			ceManager.editionEnCours = false;
		};

		btAnnuler.addEventListener('click',handlerAnnulationEdition);
		btAnnulerDeFormPost.addEventListener('click',handlerAnnulationEdition);

		nouvelleZoneContenu.appendChild(zoneBoutonsEdition);
		ancienneZoneContenu.parentNode.replaceChild(nouvelleZoneContenu,ancienneZoneContenu);

		this.editionEnCours = true;
	}

	getPseudoN4(){
		return this.formPostManager.getPseudoN4();
	}

	getTextareaNouveauMessage(){
		return this.formPostManager.getTextareaNouveauMessage();
	}
	
	get pseudoAuth(){
		return this.formPostManager.pseudoAuth;
	}
	set pseudoAuth(pseudo){
		this.formPostManager.pseudoAuth = pseudo;
	}


	// récupère la période de temps couverte par cette page d'un topic jvc
	// la date de début est la date du premier post, ou null si c'est la première page
	// la date de fin est celle du premier message de la page suivante, ou null si il n'y a pas de page suivante
  // peut donc impliquer une requête vers JVC pour obtenir la page 2, d'où le côté asynchrone
	// renvoie un objet avec .de et .a
	getBornesTemporelles(callback){
		var ceMgr = this;
		var postsData = this.postsData;
		if(!postsData.length){
			callback({de:null,a:null});
			return;
		}

		var de;
		if(this.estPremierePage){
			de = null;
		}
		else{
			de = this.postsData[0].timestamp;
		}

		var a;
		var urlPageSuivante = this.getUrlPageSuivante();
		if(!urlPageSuivante){
			callback({de:de,a:null});
			return;
		}
		else{
			var xhr = new XMLHttpRequest();
			xhr.open("GET",urlPageSuivante);
			xhr.withCredentials = true;
			xhr.onreadystatechange = function(){
				if(this.readyState == XMLHttpRequest.DONE){
					if(this.status != 200){
						return;
					}
					var datePremierPost = ListePostsManager.getDatePremierPost(xhr.responseText);
					callback({de:de,a:(datePremierPost || null)});
				}
			}
			xhr.send(null);
		}
	}

	getDatePremierPost(htmlPage){
		if(!htmlPage){
			htmlPage = this.conteneurElem.innerHTML;
		}
		return ListePostsManager.getDatePremierPost(htmlPage);
	}
	// parse le code source d'une page d'un topic jvc et renvoie la date du premier post (objet Date)
	static getDatePremierPost(htmlPage){
		// pourrait faire un DOM avec le code, mais c'est sans doute plus rapide de parser le code comme ça
		var regexRecherche = '<div class="bloc-date-msg">\\s*<(?:span|a).*?>([^\<]*)';
		var match = htmlPage.match(regexRecherche);
		return match && parseTLong(match[1]);
	}
	
	getDateDernierPost(htmlPage){
		if(!htmlPage){
			htmlPage = this.conteneurElem.innerHTML;
		}
		return ListePostsManager.getDateDernierPost(htmlPage)
	}
	static getDateDernierPost(htmlPage){
		/*
		// inversait le code html et la rexeg pour trouver le dernier post en premier, mais les performances de cette regex sont à chier
		var regexRecherche = '<(.*?)>[^>]*(?:naps|a)<\\s*>"gsm-etad-colb"=ssalc vid<';
		var match = htmlPage.split('').reverse().join('').match(regexRecherche);
		return match && parseTLong(match[1].split('').reverse().join(''));
		*/
		var regexRecherche = /<div class="bloc-date-msg">\s*<(?:span|a).*?>([^\<]*)/g;
		let ceMatch;
		var match;// = htmlPage.match(regexRecherche);
		while(ceMatch = regexRecherche.exec(htmlPage)){
			match = ceMatch;
		}
		return match && parseTLong(match[match.length-1]);
	}

	// handler pour le formulaire de post, qui en l'occurrence prend les paramètres (texte,pseudo)
	// pseudo étant le pseudo n4 renseigné dans le formulaire (pas le vrai pseudo), ou null si la case est décochée
	setOnPostButtonN4Clicked(handler){
		this.formPostManager.setOnPostButtonN4Clicked(handler);
	}

	// handler reçoit params (postId,postElem)
	setOnDeleteButtonN4Clicked(handler){
		this.onDeleteButtonN4Clicked = handler;
	}

	// handler reçoit (id,nouveautexte,postElem)
	setOnConfirmEditButtonN4Clicked(handler){
		this.onConfirmEditButtonN4Clicked = handler;
	}
	
	// handler reçoit pseudo,mdp
	setOnBtAuthClicked(handler){
		this.formPostManager.setOnBtAuthClicked(handler);
	}
	
	setOnBtDeauthClicked(handler){
		this.formPostManager.setOnBtDeauthClicked(handler);
	}

	// handler reçoit postId
	setOnBtBannirAuteurPostClicked(handler){
		this.onBtBannirAuteurPostClicked = handler;
	}
	
	setOnBtDebannirAuteurPostClicked(handler){
		this.onBtDebannirAuteurPostClicked = handler;
	}
	
	// reçoit postId,postElem
	setOnBtSignalerPostClicked(handler){
		this.onBtSignalerPostClicked = handler;
	}
	
	// reçoit identifiant du thème ('normal' ou 'dark')
	setOnLienThemeClicked(handler){
		this.onLienThemeClicked = handler;
		if(this.formPostManager){
			this.formPostManager.setOnLienThemeClicked(handler);
		}
	}
	
	viderFormPost(){
		this.formPostManager.viderForm();
	}
}


// pour form poster message présent sur une page d'un topic jvc
class FormPostManager{
	constructor(formElem){		// #bloc-formulaire-forum
	this.formElem = formElem;

	let editeur = this.getEditeur();		// met un repère au niveau de l'éditeur pour le remettre après si on l'emprunte
	editeur.parentNode.insertBefore(elementFromHtml('<span style="display:none" id="place-originale-editeur"></span>'),editeur);
	this.textAreaMsg = this.formElem.querySelector('#message_topic');		// permet de la garder à portée quand elle est déménagée pour l'édition
	}

	// ajoute l'input pour le pseudo choisi, les radiobutton qui va avec
	// et le bouton poster
	ajouterInputsN4(){
		var btPosterJvc = this.formElem.querySelector('.btn-poster-msg');
		// var btPosterN4 = btPosterJvc.cloneNode(true);		// certains utilisateurs se plaignent que le bouton poste aussi sur jvc, on essaiera d'éviter ça en ne mettant pas les classes CSS de jvc sur le nouveau bouton
		// btPosterN4.classList.add('btn-n4');
		// btPosterN4.setAttribute('type','button');
		var btPosterN4 = elementFromHtml('<button class="btn-ppp btn-poster-ppp" tabindex="5" type="button">Poster</button>');

		var ceManager = this;

		var gestClicPoster = this.getGestionnaireSurClickSurBtPoster();
		btPosterN4.addEventListener('click',gestClicPoster);
		
		var radioBtPseudoJvc = elementFromHtml('<input type="radio" name="pseudo-pour-poster-ppp" id="rb-pseudo-jvc" tabindex="5" style="margin-left:5px;margin-right:4px;">');
		var labelPseudoJvc = document.createElement('LABEL');
		labelPseudoJvc.style.fontWeight = "normal";
		labelPseudoJvc.appendChild(radioBtPseudoJvc);
		labelPseudoJvc.appendChild(document.createTextNode(" Pseudo JVC"));
		
		var radioBtPseudoJvp = elementFromHtml('<input type="radio" name="pseudo-pour-poster-ppp" id="radio-pseudo-ppp" tabindex="6" style="margin-right:9px;margin-left:9px;">');
		let utiliserPseudo410 = localStorage.getItem('n5_utiliserPseudoN4');
		if(utiliserPseudo410 === null){
			radioBtPseudoJvp.checked = true;		// coché par défaut, éviter de poster avec son pseudo original par distraction
		}
		else if(utiliserPseudo410){
			radioBtPseudoJvp.checked = true;
		}
		else{
			radioBtPseudoJvc.checked = true;
		}
		
		var inputPseudoN4 = elementFromHtml('<input type="text" id="input-pseudo-ppp" maxlength="15" class="form-control" placeholder="En tant que" style="display:inline-block;width:auto;" tabindex="7">');
		inputPseudoN4.value = localStorage.getItem('n5_pseudoN4') || '';

		var inputMdpN4 = elementFromHtml('<input type="password" id="input-mdp-ppp" class="form-control" placeholder="Mot de passe éventuel" style="display:inline-block;width:auto;" tabindex="8">');

		// adapte l'état des radiobutton automatiquement
		inputPseudoN4.addEventListener('input',function(){
			if(this.value){
				radioBtPseudoJvp.checked = true
			}
			else{
				radioBtPseudoJvc.checked = true;
			}
			ceManager.updateAffichageAuth();
		});

		inputMdpN4.addEventListener('input',function(){radioBtPseudoJvp.checked = true;});

		var imgConnect = elementFromHtml('<img id="img-auth-ppp" src="' + IMG_AUTH + '" alt="S\'authentifier" style="border:1px solid lightgrey;border-radius:2px;margin-left:3px;cursor:pointer;">');
		imgConnect.addEventListener('click',function(){
			if(ceManager.onBtAuthClicked){
				let pseudo = inputPseudoN4.value;
				let mdp = ceManager.getInputMdpN4().value;
				ceManager.onBtAuthClicked(pseudo,mdp);
			}
		});
		
		var simulerClicSurImgAuth = function(e){
			if(e.keyCode == 13 && imgConnect.style.display != "none"){
				simulerClicSur(imgConnect);
			};
		};
		
		inputPseudoN4.addEventListener('keypress',simulerClicSurImgAuth);
		radioBtPseudoJvp.addEventListener('keypress',simulerClicSurImgAuth);
		inputMdpN4.addEventListener('keypress',simulerClicSurImgAuth);
		imgConnect.addEventListener('keypress',simulerClicSurImgAuth);
		
		var spanPseudoAuth = elementFromHtml('<span id="span-pseudo-auth" style="display:none;"> Authentifié comme <a href="#" id="raccourci-pseudo-auth"></a> - <a href="#" id="raccourci-pseudo-deauth">Désauthentifier</a></span>');
		// raccourci pour mettre le pseudo dans la zone de pseudo
		spanPseudoAuth.querySelector('a#raccourci-pseudo-auth').addEventListener('click',function(e){
			e.preventDefault();
			inputPseudoN4.value = ceManager.pseudoAuth || '';
			ceManager.updateAffichageAuth();
		});
		// lien pour se désauthentifier
		spanPseudoAuth.querySelector('a#raccourci-pseudo-deauth').addEventListener('click',function(e){
			e.preventDefault();
			if(ceManager.onBtDeauthClicked){
				ceManager.onBtDeauthClicked();
			}
		});

		var lienProtegerPseudo = elementFromHtml('<div><a href="' + urlServ + '/proteger_pseudo.php" target="_blank"><small>Protéger mon pseudo</small></a></div>');
		var liensTheme = document.createElement('DIV');
		var lienThemeNormal = elementFromHtml('<a href="#" style="text-decoration:underline">Thème normal</a>');
		var lienThemeDark = elementFromHtml('<a href="#" style="text-decoration:underline">Thème DarkJVC</a>');
		lienThemeNormal.addEventListener('click',function(e){
			e.preventDefault();
			if(ceManager.onLienThemeClicked){
				ceManager.onLienThemeClicked('normal');
			}
		});
		lienThemeDark.addEventListener('click',function(e){
			e.preventDefault();
			if(ceManager.onLienThemeClicked){
				ceManager.onLienThemeClicked('dark');
			}

		});
		liensTheme.appendChild(lienThemeNormal);
		liensTheme.appendChild(document.createTextNode(" - "));
		liensTheme.appendChild(lienThemeDark);
		
		
		btPosterJvc.parentNode.insertBefore(btPosterN4,btPosterJvc.nextSibling);
		// les champs pseudo/mdp jvp sont mis hors du form de jvc, pour ne pas être envoyés à jvc par accident (surtout le mdp, en http qui plus est)
		var uneDiv = document.createElement('DIV');
		uneDiv.className = "forme-post-topic";		// pour les styles	// devrait être form-..., thx jvc
		uneDiv.appendChild(labelPseudoJvc);
		uneDiv.appendChild(radioBtPseudoJvp);
		uneDiv.appendChild(inputPseudoN4);
		uneDiv.appendChild(inputMdpN4);
		uneDiv.appendChild(imgConnect);
		uneDiv.appendChild(spanPseudoAuth);
		uneDiv.appendChild(lienProtegerPseudo);
		uneDiv.appendChild(liensTheme);
		var leForm = this.formElem.querySelector('form.form-post-topic');
		leForm.parentNode.insertBefore(uneDiv,leForm.nextSibling);
	}

	retirerBtPosterOriginal(){;
		let btPoster = this.formElem.querySelectorAll('.btn.btn-poster-msg');
		for(let i = 0 ; i < btPoster.length ; i++){
			if(!btPoster[i].classList.contains('btn-ppp')){
				btPoster[i].style.display = "none";
			}
		}
	}
	
	updateAffichageAuth(){
		let spanPseudo = this.formElem.querySelector('#span-pseudo-auth');
		let imgAuthJvp = this.formElem.querySelector('#img-auth-ppp');
		let inputMdp = this.formElem.querySelector('#input-mdp-ppp');

		if(this.pseudoAuth){
			let spanPseudo = this.formElem.querySelector('#span-pseudo-auth');
			spanPseudo.style.display = "initial";
			spanPseudo.querySelector('a').text = this.pseudoAuth;
			imgAuthJvp.style.display = 'none';
			inputMdp.style.display = "none";
			
		}
		else{
			spanPseudo.style.display = "none";
			spanPseudo.querySelector('a').text = '';
			imgAuthJvp.style.display = 'initial';
			inputMdp.style.display = 'initial';
		}
		
		let input = this.getInputPseudoN4();
		if(this.pseudoAuth && this.pseudoAuth.toUpperCase() == this.getInputPseudoN4Value().toUpperCase()){
			input.style.background = '#acf0ac url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAZdEVYdFNvZnR3YXJlAHBhaW50Lm5ldCA0LjAuMjHxIGmVAAAE0ElEQVRIS72Ve0xTZxjGZS4scaJdSwEZbo5tOlZwsqjJLtItKmucIJkYlyHRmFnlUoQoclGRFcSCtBVazDJaoMXe6DktLbciDArIHSY61OEUlmmcicsuziVuiz47WHR8pmr3B/6S94/nPd/3PHm/c5sF4KmW2+ZMltvmTBYpPMNLJlPyiosVi6f0EyEyCPEEFAoFp9HR2kKfsqGmwwrKYreIRKJ5U5cfCZFBiMdgMlnecZ7qHtd8o4V4WIz0vnRIO2Ww1zedKy4uCZ9a5hYigxBuMBqNob29Q1Vdp3vuUGM0KsYqID8rx/6BA9jVnog0Rzr0Durv2tqG4wUFxW6PmcggxDSGh08f6B0cGGs/2wF61IKGHxvQ+VMnmq+cRNV5LfJ6CpHQuAebTNsRVb0Fuw0HoLbr79LWulG9nk5hLLxcTh4Gtg123Mzqy4JkRILqi9Xovt6Da7eu4dsb51Bz3oaC9lLsorIQUy7EmpJ4rJXHY6XkE0RIN0NnNF9lLB7cWyKDENNo7m25ndiViENDh6C6oELbFSe+/2Ucg1dHcGLIikP1pdimzkbssVQMXTiDS5cv4eNcIYLT1kFrrLnBWPi7nDwMrO2s+yu+LR6p3amQDB5F1Rk9LKON0A3aUOyoRIqmEBule2D5ugn9/f1wOp34YO9m+CVGQK3T/8xYBLicPAyk2q2IaopCnGMrkpkHY7+jEOIGJbLNpRCW52G9NAkHq6Sw2+2gaRqfH0kBOykUL6SHo8po+JWxWOBy8jDQ0FJz+31LBNYao7FBuw0iXQ7y9UpEF4iwumg7NpUmgaIpUJQZ+eUScNJeBSdvCVhfLIbWZJw80v8XaHM0XgzTLkdY2SrwCtZAa9G7zFUyLD34EdSUBlarBQarAYuyloAjXwh2SRB8jy6CmbJ+x1j4upw8DGxt7dAvV/IReHgZgjJWYZ/yMHN0FGy2WlTUatDubEXfQDeiZNHgKLngVPiCpWIj/PgKGI0mG2PxvMvJw0CDgfosUbsPfgffRsDuCLy4YzUqa09gYKgXo+dHcPmHMWjaKsEpYsNf44uAal9wNWxk2rKRnJySxljMdjl5GCgUCudUW8w3/DNWgJvABzeRj5DM1Tg3MYo/bt3E73/+hlAJD4FVfnjdFAgeHYRQ/SJYG+uue3t7h0zZ3IPIIMRD6HRUZpwsDewdEeAkvQtOxjKsLd2IwYlhiEwicJXse2HvNbyG9W085NanQywWy5mtc1wOLogMQjzE5JQ6Mz2+cGckWEkrwcoMBSsvGPOO+GG+Yj78tRwstQQhxhmGFKcAZpqeYKZ7k9n64LM2CZFBCDfIZGWR4i9L7/okLIdPRgh88l/G3BIu5qp8wNWy8Jb1JWzt4kPXqPknJiZGyGzxdu38DyKDEO7xUqu1RXGSNPik8zBP/ApYJYHwr1wAXs0b2HAyEnK7FDk5uWpm7YNXYTpEBiEeAZ/Pf1alqqYTyrLx4VexEBg2IrbhU+zsEEJqP4bCQnkzsyyYKeIo70NkEOIxCASC58rKVOVlxsq7+cxEEoccFdYTd3Jy8szM5cn/4DP3FrqByCDEk5mdmro3UqEo1xQVlRgEgnVbmJ4fU24nuw+RQQjPmXypJx+OR041HSJjunga5bY5k+W2OXOFWf8CcqX4thPgLmcAAAAASUVORK5CYII=") no-repeat right center';
			input.style.paddingRight = "22px";
		}
		else{
			input.style.background = "white";
			input.style.paddingRight = "12px";
		}
	}

	get pseudoAuth(){
		return this._pseudoAuth || '';
	}
	set pseudoAuth(pseudo){
		this._pseudoAuth = pseudo;
		this.updateAffichageAuth();
	}

	setTitre(titre){
		this.formElem.querySelector('.titre-bloc').innerText = titre
	}

	// génère le handler à mettre sur le bouton poster n4 dès qu'il est créé, et
	// qui sert lui-même à appeler le handler custom mis par le code utilisateur
	getGestionnaireSurClickSurBtPoster(){
		let ceManager = this;
		return function(e){
			e.preventDefault();
			if(ceManager.onPostButtonN4Clicked){
				let texte = ceManager.getTexteNouveauMessage();
				let pseudoN4 = ceManager.getPseudoN4();
				ceManager.onPostButtonN4Clicked(texte, pseudoN4);
			}
		}
	}

	getZoneBoutonsPoster(){
		return this.formElem.querySelectorAll('.form-post-topic > .row .col-md-12.bloc-editor-forum')[1];
	}

	masquerZoneBoutonsPoster(){
		this.getZoneBoutonsPoster().style.display = "none";
	}

	reafficherZoneBoutonsPoster(){
		this.getZoneBoutonsPoster().style.display = "block";
	}

	getTextareaNouveauMessage(){
		return this.textAreaMsg;
	}

  getTexteNouveauMessage(){
    return this.getTextareaNouveauMessage().value;
  }

	getEditeur(){
		return this.formElem.querySelector('.jv-editor');
	}

	putEditeur(editeur){
		let repere = this.formElem.querySelector('#place-originale-editeur');
		repere.parentNode.insertBefore(editeur,repere);
	}

	viderForm(){
		this.getTextareaNouveauMessage().value = "";
	}

	neutraliserSubmitForm(){
		this.formElem.querySelector('form').onsubmit = function(e){e.preventDefault(); return false;};
	}

	// handler reçoit (texte,pseudo), ou (texte, pseudo, titre) pour la classe FormPostTopicManager
	setOnPostButtonN4Clicked(handler){
		this.onPostButtonN4Clicked = handler;
	}

	// handler reçoit pseudo,mdp
	setOnBtAuthClicked(handler){
		this.onBtAuthClicked = handler;
	}
	
	setOnBtDeauthClicked(handler){
		this.onBtDeauthClicked = handler;
	}
	
	setOnLienThemeClicked(handler){
		this.onLienThemeClicked = handler;
	}

	// renvoie null si le bt radio pseudo jvp n'est pas checké
	// (suppose que les inputs n4 ont été ajoutés)
	getPseudoN4(){
		var pseudo;
		var radioBtJvp = this.formElem.querySelector('#radio-pseudo-ppp');
		var valeurInput = this.formElem.querySelector('#input-pseudo-ppp').value;
		if(radioBtJvp.checked){
			pseudo = valeurInput;
		}
		else{
			pseudo = null;
		}
		localStorage.setItem('n5_utiliserPseudoN4',radioBtJvp.checked ? "1" : "");		// chrome ne stocke que des string dans localStorage, un booléen deviendrait "false" donc interprété ensuite comme true
		localStorage.setItem('n5_pseudoN4',valeurInput);
		return pseudo;
	}

	getInputPseudoN4(){
		return this.formElem.querySelector('#input-pseudo-ppp');
	}
	
	getInputPseudoN4Value(){
		return this.formElem.querySelector('#input-pseudo-ppp').value;
	}
	
	setInputPseudoN4Value(value){
		this.formElem.querySelector('#input-pseudo-ppp').value = value;
		this.updateAffichageAuth();
	}
	
	getInputMdpN4(){
		return this.formElem.querySelector("#input-mdp-ppp");
	}
	
	setInputMdpN4Value(value){
		this.formElem.querySelector('#input-mdp-ppp').value = value;
	}
	
	getInputMdpN4Value(){
		return this.formElem.querySelector('#input-mdp-ppp').value;
	}
	
	// pour les topics fermés, où le form poster est absent, crée un ersatz que le manager pourra ensuite utiliser
	static creerNouveauFormMessage(){
		return elementFromHtml(
`<div id="bloc-formulaire-forum">
<div class="titre-head-bloc"><div class="titre-bloc">Répondre</div></div>

<form role="form" class="form-post-topic form-post-message js-form-post-message" method="post" action="">
		<div class="row">
        <div class="col-md-12 bloc-editor-forum">

<div class="jv-editor">
    <div class="conteneur-editor">
        <div class="text-editor">
            <textarea tabindex="3" class="area-editor js-focus-field" name="message_topic" id="message_topic" placeholder="Pour que les discussions restent agréables, nous vous remercions de rester poli en toutes circonstances. En postant sur nos espaces, vous vous engagez à en respecter la charte d'utilisation. Tout message discriminatoire ou incitant à la haine sera supprimé et son auteur sanctionné."></textarea>
        </div>
    </div>
</div>
        </div>
        <div class="col-md-12 bloc-editor-forum">
            <button tabindex="4" type="submit" class="btn btn-poster-msg datalayer-push js-post-message" data-push="post_forum">Poster</button>
                                    <select class="select-user-post" id="form_alias_rang" name="form_alias_rang" style="display: none;">
            <option value="1" selected=""></option>
        </select>

            <span class="form-harassment">
                Victime de harcèlement en ligne : <a href="/harcelement.htm" class="xXx " sl-processed="1">comment réagir ?</a>
            </span>
        </div>
    </div>
</form>
</div>`);
	}


	// fabrique un form qui puisse servir à ajouter des messages sur un topic n4
	// avec une structure suffisamment fidèle au form de message de jvc pour que la classe FormPostManager puisse le gérer
	static creerFormMessageApdFormTopic(formTopicElem){
		let editeur = formTopicElem.querySelector('.jv-editor');
		let nouveauForm = elementFromHtml(
`<div id="bloc-formulaire-forum" data-topic-id="56591875">
   <div class="titre-head-bloc">
      <div class="titre-bloc">Répondre</div>
   </div>
   <form role="form" class="form-post-topic form-post-message js-form-post-message" method="post" action="" data-check="/forums/ajax_check_poste_message.php?id_topic=56591875&amp;ajax_hash=f9b1e77ebbdd9d8246a5f0bcb8f5e7c43ded2e6e">
      <div class="row">
         <div class="col-md-12 bloc-editor-forum">
				 <span style="display:none" id="repere-ou-mettre-editeur"></span>
         </div>
         <div class="col-md-12 bloc-editor-forum">
            <button tabindex="4" type="submit" class="btn btn-poster-msg datalayer-push js-post-message" data-push="post_forum">Poster</button>
         </div>
      </div>
   </form>
</div>`);
		let repereEditeur = nouveauForm.querySelector('#repere-ou-mettre-editeur');
		repereEditeur.parentNode.replaceChild(editeur,repereEditeur);
		return nouveauForm;
	}

}

// variante pour form post topic présent sur la liste des topics jvc
class FormPostTopicManager extends FormPostManager{
	constructor(formElem,rechargerSansPOST){
		super(formElem,rechargerSansPOST);
	}

	// par rapport à la classe parente, renvoie aussi le titre
	getGestionnaireSurClickSurBtPoster(){
		let ceManager = this;
		return function(e){
			e.preventDefault();
			if(ceManager.onPostButtonN4Clicked){
				let texte = ceManager.getTexteNouveauMessage();
				let pseudoN4 = ceManager.getPseudoN4();
				let titre = ceManager.getTitreTopic();
				ceManager.onPostButtonN4Clicked(texte,pseudoN4,titre)
			}
		}
	}

	viderForm(){
		this.getTextareaNouveauMessage().value = "";
		let inputTitre = this.getInputTitreTopic();
		if(inputTitre){
			inputTitre.value = "";
		}
	}

	getTitreTopic(){
		let inputTitre = this.getInputTitreTopic();
		return inputTitre ? inputTitre.value : null;
	}

	getInputTitreTopic(){
		return this.formElem.querySelector('#titre_topic');
	}
}


// **************************
// ********** EP ************
// **************************

console.log('JVP INIT');
console.log('int');

main();		// permet de faire return pour couper court à l'exécution

function main(){
  var url = window.location.href;
	var pageType = getPageType();

  console.log('JVP - page type : ',pageType);

  if(!pageType){
		return;
	}

  var traiterPage =
   	({
      'liste_topics' : traiterPageListeTopics,
      'topicn4' : traiterPageTopicN4,
      'recherche' : traiterPageRecherche,
      'connexion' : traiterPageConnexion,
			'topicjvc' : traiterPageTopicJvc,
			'liste_topics_n4' : traiterPageListeTopicsN4
    })[pageType];

  // attend la fin du chargement pour agir
  if(document.readyState != "complete"){			// évite de lancer les opérations si la page est chargée depuis le cache, pour éviter une réexécution du script
  	document.addEventListener('DOMContentLoaded', traiterPage);
  }
} // fin main()


function traiterPageTopicJvc(){
	var Ctrl;
	if(PageManager.estTopic410()){
		Ctrl = new ControleurPageTopic410();
		// À faire plus tard : rediriger vers un topic backup
		return;
	}
	
	if(!PageManager.getCtnrMessagesPagi()){
		console.log('JVP - Conteneur messages non trouvé, fin traitement');
		return;		// évite d'appliquer le script sur un topic supprimé ou inexistant
	}
	
	Ctrl = new ControleurPageTopicJvc();
	Ctrl.load();
	return;
	
}

function traiterPageConnexion(){
  var Ctrl = new ControleurPageConnexion();
	Ctrl.load();
}

function traiterPageRecherche(){
	var Ctrl = new ControleurPageRecherche();
	Ctrl.load();
}

function traiterPageListeTopics(){
 	// on a peut-être été redirigé ici après une connexion depuis un topic n4 ; dans ce cas, rediriger vers le topic
	//  - code désactivé, ne s'avère pas nécessaire, JVC remet automatiquement le hash de la page de co au retour au forum
	/*
  var isConnectingOuDisconnecting = getCookie('n4_connecting') || getCookie('n4_disconnecting') ;
  if(isConnectingOuDisconnecting){
    var retUrl = getCookie('n4_ret_hash');
    deleteCookie('n4_connecting');
    deleteCookie('n4_disconnecting');
    deleteCookie('n4_ret_hash');
		window.location.href = window.location.href.split('#')[0] + "#" + retUrl;
    return;
  }
	*/

	var Ctrl = new ControleurPageListeTopics();
	Ctrl.load();	
}


function traiterPageTopicN4(){
	var Ctrl = new ControleurPageTopicN4();
	Ctrl.load();
}


function traiterPageListeTopicsN4(){
	var Ctrl = new ControleurPageListeTopicsN4();
	Ctrl.load();
}

// Fonctions traitant la communication avec le serveur
// voir la doc serveur pour le format des réponses
class Serv{

	static createPost(type,jvcId,threadId,forumId,texte,auteur,estAuteurJvc,datePost,callback){
		// datePost pas utilisé actuellement
		Serv.envoyerRequete('/create_post.php?ajax=1',{type:type,jvc_id:jvcId || '',thread_id:threadId,forum_id:forumId,texte:texte,auteur:auteur,est_auteur_jvc:estAuteurJvc?'1':'0'},callback);
	}

	static deletePost(postId,callback){
		Serv.envoyerRequete('/delete_post.php?ajax=1',{post_id:postId},callback);
	}
	
	static deleteTopic(topicId,callback){
		Serv.envoyerRequete('/delete_topic.php?ajax=1',{topic_id:topicId},callback);
	}

	static editPost(postId,texte,callback){
		Serv.envoyerRequete('/edit_post.php?ajax=1',{post_id:postId,texte:texte},callback);
	}

	// renvoie une page de posts à partir du post ayant le numéro "first"
	static getPosts(idTopic,idForum,first,callback){
		Serv.envoyerRequete('/get_posts.php?ajax=1',{id:idTopic,idForum:idForum,first:first},function(errCode,msg,res){
			if(!errCode){
				// traduit les timestamps unix avant de les transmettre à la callback
				for (let i = 0 ; i < res.posts.length ; i++){
					res.posts[i].timestamp = timestampToDate(res.posts[i].timestamp);
					if(res.posts[i].lastEdit){
						res.posts[i].lastEdit = timestampToDate(res.posts[i].lastEdit);
					}
				}
				res.threadInfo.lastUpdate = timestampToDate(res.threadInfo.lastUpdate);
			}
			callback(errCode,msg,res);
		});
	}
	
	// renvoie les posts de telle à telle date/heure
	// attend un id de topic jvc
	static getPostsParallele(idTopicJvc,idForum,tMin,tMax,numeroPageCourante,numerosAutresPages,callback){
		Serv.envoyerRequete('/get_posts_parallele.php?ajax=1',{jvc_topic_id:idTopicJvc,forum_id:idForum,t_debut:tMin ? dateToTimestamp(tMin) : '',t_fin:tMax ? dateToTimestamp(tMax) : '',page_courante:numeroPageCourante,pages_annexes:numerosAutresPages},function(errCode,msg,res){
		if(!errCode){
			for(let i = 0 ; i < res.posts.length ; i++){
				res.posts[i].timestamp = timestampToDate(res.posts[i].timestamp);
				res.posts[i].lastEdit = timestampToDate(res.posts[i].lastEdit);
			}
		}
		callback(errCode,msg,res);
		});
	}

	static createThread(titre,texte,forumId,auteur,estAuteurJvc,callback){		// peut-être renommer createThreadN4 ? ou l'utiliser pour tous les types de threads, avec des params suppl ?
		Serv.envoyerRequete('/create_thread.php?ajax=1',{forum_id:forumId,titre:titre,type:'n4',texte:texte,auteur:auteur,est_auteur_jvc:estAuteurJvc?'1':'0'},callback);
	}

	static getTopicsN4(forumId,tMin,tMax,avecEpingles,idsTopicsJvc,callback,typeRecherche,texteRecherche){
		let params = {forum_id:forumId,t_debut:dateToTimestamp(tMin),t_fin:dateToTimestamp(tMax),epingles:avecEpingles?1:0,topics_jvc:idsTopicsJvc.join('%2C')};

		if(typeRecherche && texteRecherche){
			params['type_recherche'] = typeRecherche;
			params['texte_recherche'] = texteRecherche;
		}

		console.log('ENVOYING REQUETE');
		Serv.envoyerRequete('/get_threads.php?ajax=1',params,function(errCode,msg,res){
			if(!errCode){
				let listes = {a:res.threads,b:res.threadsSuppl};
				for(let h in listes){
					let threads = listes[h];
					for(let i = 0 ; i < threads.length ; i++){
						let thread = threads[i];
						thread.nb = parseInt(thread.nb);
						thread.dernier = new Date(parseInt(thread.dernier)*1000);
						thread.epingle = thread.epingle != '0';
					}
				}
			}
			callback(errCode,msg,res)
		});
	}

	static getTopicsFullN4(forumId,premier,callback,typeRecherche,texteRecherche){
		var params = {forum_id:forumId,premier:premier};
		if(typeRecherche && texteRecherche){
			params['type_recherche'] = typeRecherche;
			params['texte_recherche'] = texteRecherche;
		}
		Serv.envoyerRequete('/get_threads_full_jvp.php',params,function(errCode,msg,res){
			if(!errCode){
				for(let i = 0 ; i < res.threads.length ; i++){
					let thread = res.threads[i];
					thread.nb = parseInt(thread.nb);
					thread.dernier = new Date(parseInt(thread.dernier)*1000);
					thread.epingle = thread.epingle != '0';
				}
			}
			callback(errCode,msg,res);
		});
	}
	
	static auth(pseudo,mdp,callback){
		Serv.envoyerRequete('/auth.php?ajax=1',{pseudo:pseudo,mdp:mdp},function(errCode,msg,res){
			callback(errCode,msg,res);
		})
	}
	
	static deauth(callback){
		Serv.envoyerRequete('/deauth.php?ajax=1',{},function(errCode,msg,res){
			callback(errCode,msg,res);
		});
	}
	
	static banAuteurPost(postId,callback){
		Serv.envoyerRequete('/ban_auteur_post.php?ajax=1',{post_id:postId},function(errCode,msg,res){
			callback(errCode,msg,res);
		})
	}
	
	static debanAuteurPost(postId,callback){
		Serv.envoyerRequete('/deban_auteur_post.php?ajax=1',{post_id:postId},function(errCode,msg,res){
			callback(errCode,msg,res);
		});	
	}
	
	static banAuteurTopic(topicId,callback){
		Serv.envoyerRequete('/ban_auteur_topic.php?ajax=1',{topic_id:topicId},function(errCode,msg,res){
			callback(errCode,msg,res);
		});
	}
	
	static debanAuteurTopic(topicId,callback){
		Serv.envoyerRequete('/deban_auteur_topic.php?ajax=1',{topic_id:topicId},function(errCode,msg,res){
			callback(errCode,msg,res);
		});
	}
	
	static signalerPost(postId,callback){
		Serv.envoyerRequete('/signal_post.php?ajax=1',{post_id:postId},function(errCode,msg,res){
			callback(errCode,msg,res);
		});
	}
	
	// timestamps est un objet où les clés sont les ids des topics actifs et les valeurs des timestamps javascript (int en millisecondes)
	static heartbeatTopics(topicsOuverts){
		var topicsOuvertsSec = {};		// le serveur attend des timestamps en secondes
		for(let i in topicsOuverts){
			topicsOuvertsSec[i] = {};
			topicsOuvertsSec[i].timestamp = Math.floor(topicsOuverts[i].timestamp/1000);
			topicsOuvertsSec[i].forumId = topicsOuverts[i].forumId;
		}
		Serv.envoyerRequete('/heartbeat.php',{topicsOuverts:JSON.stringify(topicsOuvertsSec)});
	}
	
	// topicId = id jvc du topic
	// pages = [{nPage:4,datePremierPost:unedate,dateDernierPost:uneautredate},...]
	static siPagesOntPostsJvp(topicId,pages,callback){
		// le serveur attend des timestamps en secondes
		var pAEnvoyer = [];
		for(let i = 0 ; i < pages.length ; i++){
			let p = pages[i];
			let nvP = {};
			nvP.nPage = p.nPage;
			nvP.datePremierPost = p.datePremierPost ? Math.floor(p.datePremierPost/1000) : null;
			nvP.dateDernierPost = p.dateDernierPost ? Math.floor(p.dateDernierPost/1000) : null;
			pAEnvoyer.push(nvP);
		}
		Serv.envoyerRequete('/si_pages_ont_posts_jvp.php',{topic_id:topicId,pages:JSON.stringify(pAEnvoyer)},callback);
	}
	
	// où url se base sur la racine du serveur, par exemple "/un_script.php?ajax=1"
	// et 'donnees' est un objet contenant des propriétés simples (chaînes de caractères ou nombres)
	// callback est du type function(errCode,msg,res)
	static envoyerRequete(url,donnees,callback){
		var postString = '';
		donnees.version = NO_VERSION;
		let sessionId = localStorage.getItem('n5_session_id');
		if(typeof sessionId != 'undefined'){
			donnees.PHPSESSID = sessionId;
		}

		let prem = true;
		for(let i in donnees){
			if(prem){
				prem = false;
			}
			else{
				postString += '&';
			}
			postString += i + '=' + encodeURIComponent(donnees[i]);
		}
		url = urlServ + url;
		
		var GMXMR = window.GM_xmlhttpRequest || (typeof GM == "object" && GM.xmlHttpRequest);
    
		if(typeof GMXMR == "function"){
			GMXMR({
				url:url,
				method:"POST",
				synchronous:false,
				headers:{"Content-type":" application/x-www-form-urlencoded"},
				data:postString,
				timeout:4000,
				onreadystatechange:function(response){
					if(response.readyState == XMLHttpRequest.DONE){
						 console.log('--response text--');
						 console.log(response.responseText);
						let reponse;
						try{
							reponse = JSON.parse(response.responseText);
						}
						catch(e){
							reponse = {errCode:10,msg:'JVP : serveur indisponible ou réponse incorrecte.',res:null};
						}
						console.log(reponse);
						if(typeof reponse.nouveauSessId != 'undefined' && reponse.nouveauSessId !== null){
							localStorage.setItem('n5_session_id',reponse.nouveauSessId);
						}
						if(callback){
							callback(reponse.errCode,reponse.msg,reponse.res);
						}
					}
				}
			});
		}
		
		else{
			var xhr = new XMLHttpRequest();
			xhr.open('POST',url,true);
			xhr.withCredentials = true;
			xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			xhr.addEventListener('readystatechange',function(){
				if(xhr.readyState === XMLHttpRequest.DONE){
					 console.log('--response text--');
					 console.log(xhr.responseText);
					let reponse;
					try{
						reponse = JSON.parse(xhr.responseText);
					}
					catch(e){
						reponse = {errCode:10,msg:'JVP : serveur indisponible ou réponse incorrecte.',res:null};
					}
					console.log(reponse);
					if(typeof reponse.nouveauSessId != 'undefined' && reponse.nouveauSessId !== null){
						localStorage.setItem('n5_session_id',reponse.nouveauSessId);
					}

					if(callback){
						callback(reponse.errCode,reponse.msg,reponse.res);
					}
				}
			});

			xhr.send(postString);
		}
	}
}



/** Fonctions utilitaires **/

// renvoie un objet Date d'après une chaine au format "jj/mm/aaaa" ou "hh:mm:ss"
function parseT(t){
	var match;
  if(match = t.match(/([0-9]{2})\/([0-9]{2})\/([0-9]{4})/)){		
		let date = new Date(match[3] + '-' + match[2] + '-' + match[1] + 'T23:59:59' + (heureEteAParis() ? '+02:00' : '+01:00'));		// 23:59:59 : pour que les topics jvc soient considérés comme plus récents que les topics jvp de même date et apparaissent d'abord dans la liste
    return date;
  }
  else if(match = t.match(/([0-9]{2}):([0-9]{2}):([0-9]{2})/)){
		let dP = getDateParis();
		let date = new Date(dP.fullYear + '-' + formatInt(dP.month+1,2) + '-' + formatInt(dP.date,2) + 'T' + match[1] + ':' + match[2] + ':' + match[3] + (heureEteAParis() ?'+02:00':'+01:00'));
		
		return date;
  }
  else{
    return null;
	}
}

// Date à partir d'une chaîne au format "22 décembre 2017 à 04:01:15"
function parseTLong(t){
	var match = t.match(/([0-9]{1,2}) ([^ ]+) ([0-9]{4})[^0-9]+([0-9]{2}):([0-9]{2}):([0-9]{2})/);
	let mois = ['janvier','février','mars','avril','mai','juin','juillet','août','septembre','octobre','novembre','décembre'].indexOf(match[2]);
	if(match.length < 7){
		return null;
	}
	return new Date(match[3] + '-' + formatInt(mois+1,2) + '-' + formatInt(match[1],2) + 'T' + match[4] + ':' + match[5] + ':' + match[6] + (heureEteAParis() ? '+02:00' : '+01:00'));
	
	return fromHeureParis(new Date(match[3],mois,match[1],match[4],match[5],match[6]));
}

// extrait la date d'un élément <li> provenant d'une liste de topics
// renvoie un objet Date
function extractDate(liTopic){
	var cells = liTopic.childNodes;
  var t;
	for(var i = 0; i < cells.length; i++){
    if(cells[i].className == "topic-date"){
      let subCells = cells[i].childNodes;
      for(let j = 0; j < subCells.length; j++){
      	if(subCells[j].tagName == 'A'){
        	t = subCells[j].text.trim();
          break;
        }
      }
      break;
    }
  }
  if(t){
    return parseT(t);
	}
  else{
    return false;
	}
}

// formate un objet Date en une string au format utilisé sur jvc sur la liste des topics (jj/mm/aa ou hh:mm:ss selon l'ancienneté)
function formatDateToJVC(date){
	date = toHeureParis(date);
  var ajd = new Date();
	var dateParis = getDateParis();
	// if(date.getFullYear() == ajd.getFullYear() && date.getMonth() == ajd.getMonth() && date.getDate() == ajd.getDate()){
	if(date.getFullYear() == dateParis.fullYear && date.getMonth() == dateParis.month && date.getDate() == dateParis.date){
    return formatInt(date.getHours(),2)+':'+formatInt(date.getMinutes(),2)+':'+formatInt(date.getSeconds(),2);
  }
  else{
   return formatInt(date.getDate(),2)+'/'+(formatInt(date.getMonth()+1,2))+'/'+date.getFullYear();
  }
}


// formate un objet Date en une string au format long utilisé par JVC pour la date de création/d'édition d'un post, sur une page d'un topic ("12 juin 2018 à 09:49:07")
function formatDateToJVCLong(date){
	date = toHeureParis(date);
  var mois = ["janvier","février","mars","avril","mai","juin","juillet","août","septembre","octobre","novembre","décembre"];
  return formatInt(date.getDate(),2) + " " + mois[date.getMonth()] + " " + date.getFullYear() + " à " + formatInt(date.getHours(),2) + ":" + formatInt(date.getMinutes(),2) + ":" + formatInt(date.getSeconds(),2);
}

// ajoute des "0" si nécessaire pour que le nombre ait autant de chiffres qu'indiqué
function formatInt(nb,nbchiffres){
  var s = nb.toString();
  var lg = s.length;
  if(lg < nbchiffres){
  	s = "0".repeat(nbchiffres-lg)+s;
  }
  return s;
}

// par ex, la page 2 a pour premier message le 26
function firstMessageFromPage(nPage){
	return (nPage-1) * POSTS_PAR_PAGE + 1;
}

// donne le numéro du premier post de la page où se trouve le message n° nPost (le premier message étant le n° 1, comme dans les url de liste des topics de JVC)
function firstPostFromPagePost(nPost){
	return Math.ceil((nPost / POSTS_PAR_PAGE) -1) * POSTS_PAR_PAGE + 1;
}

// nombre de pages nécessaires selon le nombre de posts
function nbPagesFromNbPosts(nbPosts){
	return Math.ceil(nbPosts / POSTS_PAR_PAGE);
}

function textToCitation(texte){
	return texte.split("\n").reduce((acc,curr) => acc + '> ' + curr + "\n",'');
}

function premierCarEnMinuscule(str){
	return str.length > 0 ? str.substr(0,1).toLowerCase() + str.substr(1) : '';
}

function getCookie(nom) {
  var cooks = decodeURIComponent(document.cookie).split(';');
  nom += '=';
  // for(let i = 0 ; i < cooks.length ; i++){
	for(let i = 0 ; i < cooks.length ; i++){
    let c = cooks[i].trim();
    if (c.indexOf(nom) == 0) {
			return c.substring(nom.length, c.length);
		}
  }
  return null;
}

function deleteCookie(nom){
  document.cookie = nom+'=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  document.cookie = nom+'=; expires=Thu, 01 Jan 1970 00:00:00 UTC;';			// des fois l'un marche, des fois l'autre...
}

// pourrait utiliser .outerHTML
function elementFromHtml(html){
	var ctnr = document.createElement('DIV');
	ctnr.innerHTML = html;
	return ctnr.firstChild;
}

function simulerClicSur(elem){
	var simulatedClickEvent = document.createEvent('MouseEvents');
	simulatedClickEvent.initMouseEvent('click', true, true, window, 1, 0, 0, 0, 0, false, false, false, false, 0, null);
	elem.dispatchEvent(simulatedClickEvent);
	return;
}

// timestamp unix en secondes
function dateToTimestamp(date){
	return Math.floor(date.getTime()/1000);
}

// timestamp unix en secondes
function timestampToDate(t){
	return t && new Date(parseInt(t)*1000);
}

function getDemain(){
	return new Date(new Date().getTime() + 86400000);
}

function escapePourRegex(s){
	return s.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}

// fonction ad hoc qui trouve le premier sous-élément d'un certain type
function firstDirectChildOfType(elem,tagName){
	let children = elem.children;
	for(let i = 0 ; i < children.length ; i++){
		if(children[i].tagName == tagName){
			return children[i];
		}
	}
	return null;
}

function docCoords(elem) {
  let box = elem.getBoundingClientRect();
  return {
    x: box.left + pageXOffset,
    y: box.top + pageYOffset
  };
}

function scrollToElem(elem,offsetX,offsetY){
	let coordsCible = docCoords(elem);
	offsetX = offsetX || 0;
	offsetY = offsetY || 0;
	window.scrollTo(coordsCible.x + offsetX, coordsCible.y + offsetY);
}

function scrollToBasElem(elem,offsetX,offsetY){
	let coordsCible = docCoords(elem);
	offsetX = offsetX || 0;
	offsetY = offsetY || 0;
	let rect = elem.getBoundingClientRect();
	window.scrollTo(coordsCible.x - window.innerWidth + rect.width,coordsCible.y - window.innerHeight + rect.height + offsetY)

}
// "redirige" sans provoquer de demande de confirmation de renvoi de données post (il arrive que jvc laisse des données post associées à la page, par exemple quand on a tenté de créer un message jvc mais qu'une erreur s'est produite)
// génère une url "différente" en ajoutant un paramètre rld à la query string
// ou en l'enlevant si il y est déjà (ce qui n'arrive pas en pratique, car jvc retire lui-même les paramètres de query via une redirection)
// problème : cette méthode ajoute une entrée dans l'historique
// (alors que le changement de hash qui déclenche la fonction suite au clic sur un lien en a déjà ajouté un, quant aux "vrais" refresh, ils ne devraient pas en ajouter du tout)
// (au moins sur chrome, pas firefox, qui a le bon sens de ne pas faire deux entrées consécutives avec la même adresse)

function reloadSansPOST(){
		let qString = window.location.search && window.location.search.substring(1);
		if(qString){
			let ancLg = qString.length;
			qString = qString.replace(/(&|^)rld(?=(&|$))/g,"");
			if(ancLg == qString.length){
				qString += qString ? "&rld" : "rld" ;
			}
		}
		else{
			qString = "rld";
		}
	window.location.href = location.protocol + '//' + location.hostname + location.pathname + '?' + qString + location.hash;
}


function escapeHtml(s) {
  var cars = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return s.replace(/[&<>"']/g, function(m){
		return cars[m];
	});
}


function heureEteAParis(){
  var mtn = new Date();
  var mois = mtn.getUTCMonth();
  var jMois = mtn.getUTCDate();
  var jSem = mtn.getUTCDay();
	// dernier dimanche de mars / dernier dimanche d'octobre à 1h UTC
  return (
					     (mois > 2 && mois < 9)
					  || (    mois == 2 && ((jMois + (7 - jSem)) > 31)
					       || mois == 9 && ((jMois + (7 - jSem)) > 30)
					     )
					  );
}

// rectifie une date qui a été parsée d'après l'heure de Paris en considérant à tort qu'elle était au fuseau horaire local
function fromHeureParis(date){
  var mtn = new Date();
	return new Date(date.getTime() - mtn.getTimezoneOffset()*60000 - (heureEteAParis() ? 7200000 : 3600000));
}

// fausse une date pour qu'elle donne l'heure de Paris une fois convertie en string
function toHeureParis(date){
  var mtn = new Date();
	return new Date(date.getTime() + mtn.getTimezoneOffset()*60000 + (heureEteAParis() ? 7200000 : 3600000));
}
	 
// fonction ad hoc qui indique quelle date on est à Paris. Utile si on est sur un autre fuseau horaire
function getDateParis(){
	var tP = new Date(new Date().getTime() + (heureEteAParis() ? 7200000 : 3600000));
	return {
				   fullYear: tP.getUTCFullYear(),
					 month: tP.getUTCMonth(),
					 date: tP.getUTCDate(),
					 hours: tP.getUTCHours(),
					 minutes: tP.getUTCMinutes(),
					 seconds: tP.getUTCSeconds()
				 };
}

// inutilisé ici
// let annulerEntree = function(e){if(e.keyCode == 13){e.preventDefault();}};

