import history from './history';
import config from './config/config';

let eventRegister = function(router) {
  const routerPush = router.push.bind(router);
  const routerGo = router.go.bind(router);
  const routerReplace = router.replace.bind(router);
  const routerBack = router.back.bind(router);
  const routerForward = router.forward.bind(router);

  router.push = (location, onResolve, onReject) => {
    history.action = config.pushName;
    history.dir = config.forwardName;
    if (onResolve || onReject) {
      return routerPush(location, onResolve, onReject);
    }
    return routerPush(location).catch(error => error);
  };

  router.go = n => {
    history.action = config.goName;
    if (n >= 1) {
      history.dir = config.forwardName;
    } else {
      history.dir = config.backName;
    }
    routerGo(n);
  };

  router.replace = (location, onResolve, onReject) => {
    history.action = config.replaceName;
    history.dir = config.replaceName;
    if (onResolve || onReject) {
      return routerReplace(location, onResolve, onReject);
    }
    return routerReplace(location).catch(error => error);
  };

  router.back = () => {
    history.action = config.backName;
    history.dir = config.backName;
    routerBack();
  };

  router.forward = () => {
    history.action = config.forwardName;
    history.dir = config.forwardName;
    routerForward();
  };
};

export default eventRegister;
