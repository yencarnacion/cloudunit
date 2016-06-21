/*
 * LICENCE : CloudUnit is available under the Affero Gnu Public License GPL V3 : https://www.gnu.org/licenses/agpl-3.0.html
 *     but CloudUnit is licensed too under a standard commercial license.
 *     Please contact our sales team if you would like to discuss the specifics of our Enterprise license.
 *     If you are not sure whether the GPL is right for you,
 *     you can always test our software under the GPL and inspect the source code before you contact us
 *     about purchasing a commercial license.
 *
 *     LEGAL TERMS : "CloudUnit" is a registered trademark of Treeptik and can't be used to endorse
 *     or promote products derived from this project without prior written permission from Treeptik.
 *     Products or services derived from this software may not be called "CloudUnit"
 *     nor may "Treeptik" or similar confusing terms appear in their names without prior written permission.
 *     For any questions, contact us : contact@treeptik.fr
 */

'use strict';

angular.module('webuiApp.editApplication', [])
  .config([
    '$stateProvider',
    function($stateProvider) {
      $stateProvider
        .state('editApplication',
          {
            url: '/editApplication/:name',
            template: '<edit-application state="main.$state"></edit-application>',
            abstract: true,
            data: {
              isFree: false,
            },
            resolve: {
              App: ['ApplicationService', '$stateParams', function(ApplicationService, $stateParams) {
                return ApplicationService.findByName($stateParams.name);
              },],
            },
          })
        .state('editApplication.overview',
          {
            url: '/overview',
            template: '<edit-app-overview app="editApp.application"></edit-app-overview>',
          })
        .state('editApplication.addModule',
          {
            url: '/addModule',
            template: '<edit-app-modules app="editApp.application"></edit-app-modules>',
          })
        .state('editApplication.deploy',
          {
            url: '/deploy',
            template: '<edit-app-deploy app="editApp.application"></edit-app-deploy>',
          })
        .state('editApplication.explorer',
          {
            url: '/explorer',
            template: '<edit-app-explorer app="editApp.application"></edit-app-explorer>',
          })
        .state('editApplication.logs',
          {
            url: '/logs',
            template: '<edit-app-logs app="editApp.application" state="editApp.state"></edit-app-logs>',
          })
        .state('editApplication.monitoring',
          {
            url: '/monitoring',
            template: '<edit-app-monitoring app="editApp.application"></edit-app-monitoring>',
          })
        .state('editApplication.monitoringApp',
          {
            url: '/monitoringApp',
            template: '<edit-app-monitoring-app app="editApp.application"></edit-app-monitoring-app>',
          })
        .state('editApplication.snapshot',
          {
            url: '/snapshot',
            template: '<edit-app-snapshot app="editApp.application"></edit-app-snapshot>',
          })
        .state('editApplication.settings',
          {
            url: '/settings',
            template: '<edit-app-settings app="editApp.application"></edit-app-settings>',
          });

    }, ]);
