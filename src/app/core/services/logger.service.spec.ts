//logger.service.spec.ts : fichier de test unitaire pour LoggerService, utilisant Jasmine et Angular TestBed.

/*
Import de TestBed, outil de test Angular, qui permet de configurer un "module de test"
dans un environnement Angular minimal, et de récupérer/injecter des services.
*/
import { TestBed } from '@angular/core/testing';

// Import du LoggerService que je veux tester.
import { LoggerService } from './logger.service';

// Bloc principal de tests (Jasmine), qui regroupe tous les tests liés à LoggerService.
describe('LoggerService', () =>
  {
    // Variable qui contiendra l’instance du service à tester.
    let service: LoggerService;

    /*
      beforeEach est exécuté avant CHAQUE test (avant chaque `it`).
      J'y prépare l’environnement de test pour partir d’un état propre à chaque fois.
    */
    beforeEach(() =>
      {
        /*
          Configuration du module de test Angular. Ici, je n’ai pas besoin de déclarer de composants, ni d’importer de modules, ni de fournir de services spécifiques, 
          car LoggerService est injecté via un autre mécanisme (probablement injectable via `providedIn: 'root'` dans son décorateur @Injectable).
        */
        TestBed.configureTestingModule({});

        /*
          Récupère une instance de LoggerService depuis l’injecteur du TestBed.
          Cela simule l’injection de dépendances Angular (DI) comme dans l’application.
        */
        service = TestBed.inject(LoggerService);
      });

    //Test unitaire (Jasmine) qui vérifie que le service a été créé correctement.  
    it('should be created', () => 
      {
        // Assertion : vérifie que le service a bien été instancié (donc pas null/undefined/false).
        expect(service).toBeTruthy();
      });
  });