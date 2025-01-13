import { asyncAwait } from './asyncAwait';
import { callApplyBind } from './callApplyBind';
import { closures } from './closures';
import { currying } from './currying';
import { debounce } from './debounce';
import { eventBubbling } from './eventBubbling';
import { eventLoop } from './eventLoop';
import { hoisting } from './hoisting';
import { memoryManagement } from './memoryManagement';
import { promises } from './promises';
import { throttle } from './throttle';
import { variables } from './variables';
import { prototypes } from './prototypes';
import { jsBasics } from './jsBasics';
import { functions } from './functions';
import { objects } from './objects';
import { arrays } from './arrays';
import { referencesVsValues } from './referencesVsValues';
import { storage } from './storage';
import { thisKeyword } from './thisKeyword';
import { mixinsHOF } from './mixinsHOF';
import { executionContext } from './executionContext';
import { typeCoercion } from './typeCoercion';
import { operators } from './operators';
import { timers } from './timers';
import { apiCalls } from './apiCalls';
import { asyncDefer } from './asyncDefer';
import { modules } from './modules';
import { classes } from './classes';
import { fileHandling } from './fileHandling';
import { errorHandling } from './errorHandling';
import { performance } from './performance';
import { security } from './security';

export const conceptsMap = {
  100: jsBasics,
  101: closures,
  102: variables,
  103: functions,
  104: objects,
  105: arrays,
  106: referencesVsValues,
  107: hoisting,
  108: storage,
  109: thisKeyword,
  110: callApplyBind,
  111: debounce,
  112: mixinsHOF,
  113: asyncAwait,
  114: eventLoop,
  115: executionContext,
  116: typeCoercion,
  117: operators,
  118: timers,
  119: apiCalls,
  120: asyncDefer,
  121: modules,
  122: currying,
  123: classes,
  124: eventBubbling,
  125: fileHandling,
  126: errorHandling,
  127: memoryManagement,
  128: performance,
  129: security
};

export const concepts = Object.values(conceptsMap);
