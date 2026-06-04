(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e={50:{beg:0,nov:5,int:15,adv:27,eli:40},55:{beg:0,nov:6,int:15,adv:26,eli:39},60:{beg:0,nov:6,int:15,adv:26,eli:37},65:{beg:0,nov:6,int:15,adv:25,eli:36},70:{beg:0,nov:6,int:14,adv:24,eli:35},75:{beg:0,nov:6,int:14,adv:24,eli:34},80:{beg:0,nov:6,int:14,adv:23,eli:33},85:{beg:0,nov:6,int:13,adv:22,eli:32},90:{beg:0,nov:6,int:13,adv:21,eli:30},95:{beg:0,nov:6,int:12,adv:21,eli:29},100:{beg:0,nov:6,int:12,adv:20,eli:28},105:{beg:0,nov:5,int:11,adv:19,eli:27},110:{beg:0,nov:5,int:11,adv:18,eli:26},115:{beg:0,nov:5,int:10,adv:18,eli:25},120:{beg:0,nov:4,int:10,adv:17,eli:25},125:{beg:0,nov:4,int:10,adv:16,eli:24},130:{beg:0,nov:4,int:9,adv:16,eli:23},135:{beg:0,nov:4,int:9,adv:15,eli:22},140:{beg:0,nov:3,int:9,adv:15,eli:21}},t={15:{beg:0,nov:0,int:8,adv:17,eli:27},20:{beg:0,nov:4,int:13,adv:24,eli:36},25:{beg:0,nov:5,int:14,adv:25,eli:37},30:{beg:0,nov:5,int:14,adv:25,eli:37},35:{beg:0,nov:5,int:14,adv:25,eli:37},40:{beg:0,nov:5,int:14,adv:25,eli:37},45:{beg:0,nov:3,int:12,adv:22,eli:34},50:{beg:0,nov:1,int:9,adv:19,eli:30},55:{beg:0,nov:0,int:7,adv:16,eli:26},60:{beg:0,nov:0,int:4,adv:12,eli:21},65:{beg:0,nov:0,int:1,adv:8,eli:16}},n={50:{beg:8,nov:20,int:40,adv:55,eli:85},55:{beg:8,nov:19,int:39,adv:53,eli:82},60:{beg:7,nov:18,int:37,adv:51,eli:79},65:{beg:7,nov:17,int:36,adv:49,eli:76},70:{beg:7,nov:17,int:35,adv:48,eli:74},75:{beg:7,nov:16,int:34,adv:46,eli:71},80:{beg:6,nov:15,int:33,adv:45,eli:69},85:{beg:6,nov:15,int:31,adv:43,eli:66},90:{beg:6,nov:14,int:30,adv:41,eli:64},95:{beg:5,nov:14,int:29,adv:40,eli:62},100:{beg:5,nov:13,int:28,adv:38,eli:59},105:{beg:5,nov:12,int:26,adv:36,eli:56},110:{beg:5,nov:12,int:25,adv:35,eli:54},115:{beg:4,nov:11,int:24,adv:33,eli:51},120:{beg:4,nov:10,int:23,adv:32,eli:49},125:{beg:4,nov:10,int:22,adv:30,eli:47},130:{beg:4,nov:9,int:21,adv:29,eli:45},135:{beg:3,nov:9,int:20,adv:28,eli:43},140:{beg:3,nov:8,int:19,adv:27,eli:42}},r={20:{beg:8,nov:20,int:40,adv:55,eli:80},25:{beg:8,nov:20,int:40,adv:55,eli:80},30:{beg:7,nov:17,int:35,adv:48,eli:70},35:{beg:7,nov:17,int:35,adv:48,eli:70},40:{beg:5,nov:13,int:27,adv:38,eli:55},45:{beg:5,nov:13,int:27,adv:38,eli:55},50:{beg:3,nov:10,int:20,adv:30,eli:45},55:{beg:3,nov:10,int:20,adv:30,eli:45},60:{beg:2,nov:7,int:15,adv:22,eli:35}},i={range_20_40:1,range_41_45:.85,range_46_50:.65,range_51_55:.5,range_56_60:.3};function a(e){return e<=40?i.range_20_40:e<=45?i.range_41_45:e<=50?i.range_46_50:e<=55?i.range_51_55:e<=60?i.range_56_60:.25}function o(e,t){let n=Object.keys(e).map(Number).sort((e,t)=>e-t);if(t<=n[0])return e[n[0]];if(t>=n[n.length-1])return e[n[n.length-1]];for(let r=0;r<n.length-1;r++)if(t>=n[r]&&t<=n[r+1]){let i=(t-n[r])/(n[r+1]-n[r]),a=e[n[r]],o=e[n[r+1]],s={};for(let e of Object.keys(a))s[e]=Math.round(a[e]+i*(o[e]-a[e]));return s}return e[n[n.length-1]]}function s(e,t){let n=Object.keys(e).map(Number).sort((e,t)=>e-t),r=n[0],i=Math.abs(t-n[0]);for(let e of n){let n=Math.abs(t-e);n<i&&(i=n,r=e)}return e[r]}function c(n,r){let i=o(e,n),a=s(t,r),c={};for(let e of Object.keys(i))c[e]=Math.min(i[e],a[e]);return c}function l(e,t){let i=o(n,e),a=s(r,t),c={};for(let e of Object.keys(i))c[e]=Math.min(i[e],a[e]);return c}function u(e){let{weight:t,age:n,sex:r,pullUpMax:i,pushUpMax:o}=e;if(r!==`male`&&r!==`female`)throw Error(`Unsupported sex: ${r}. Only male/female supported.`);if(t<40||t>150)throw Error(`Weight ${t}kg out of supported range (40-150kg)`);if(n<15||n>65)throw Error(`Age ${n} out of supported range (15-65)`);let s=c(t,n),u=l(t,n),f=a(n),p=Math.max(1,Math.round(s.int*f)),m=Math.max(1,Math.round(u.int*f)),h=i>=p,g=o>=m,_=d(i,s),v=d(o,u);return{eligible:h&&g,pull:{max:i,level:_,threshold:p,passed:h,norms:s},push:{max:o,level:v,threshold:m,passed:g,norms:u}}}function d(e,t){return e>=t.eli?`elite`:e>=t.adv?`advanced`:e>=t.int?`intermediate`:e>=t.nov?`novice`:`beginner`}function f(e,t){let{weight:n,age:r}=e,i=c(n,r),o=l(n,r),s=a(r),u=Math.round(i.eli*s),d=Math.round(o.eli*s),f={pull:{goal:t.pullUps,ceiling:u,ratio:t.pullUps/u,warning:null,capped:t.pullUps},push:{goal:t.pushUps,ceiling:d,ratio:t.pushUps/d,warning:null,capped:t.pushUps}};return f.pull.ratio>.9&&(f.pull.warning=`approaching_ceiling`),f.pull.ratio>1&&(f.pull.capped=Math.round(u*.95),f.pull.warning=`capped_at_95pct_ceiling`),f.push.ratio>.9&&(f.push.warning=`approaching_ceiling`),f.push.ratio>1&&(f.push.capped=Math.round(d*.95),f.push.warning=`capped_at_95pct_ceiling`),f}function p(e,t,n){return e>=t?0:((t-e)/t)**.6*Math.max(.7,1-n*.005)}function m(e,t,n){return .9*p(e,t,n)}function h(e,t,n){return 2.5*p(e,t,n)}var g=.05,_=.1;function v(e,t,n,r){let i=r===`pull`?m:h,a=r===`pull`?g:_,o=e,s=0;for(;o<t&&s<200;){let e=i(o,n,s);o+=e,s++,s%4==0&&(o+=a)}return Math.min(s,200)}function y(e,t,n){let r=(t-e)/n;return r<=.15?1:r<=.3?2:r<=.5?3:4}function b(e,t,n){let r=[],i=e/(e+t),a=t/(e+t);return n===1?r.push({pull:.55,push:.45,label:`balanced`}):n===2?i>a?(r.push({pull:.65,push:.35,label:`pull_focus`}),r.push({pull:.4,push:.6,label:`push_focus`})):(r.push({pull:.4,push:.6,label:`push_focus`}),r.push({pull:.6,push:.4,label:`pull_focus`})):n===3?i>a?(r.push({pull:.65,push:.35,label:`pull_focus`}),r.push({pull:.5,push:.5,label:`balanced`}),r.push({pull:.35,push:.65,label:`push_focus`})):(r.push({pull:.35,push:.65,label:`push_focus`}),r.push({pull:.5,push:.5,label:`balanced`}),r.push({pull:.65,push:.35,label:`pull_focus`})):i>a?(r.push({pull:.65,push:.35,label:`pull_focus`}),r.push({pull:.55,push:.45,label:`pull_maintain_push_build`}),r.push({pull:.35,push:.65,label:`push_focus`}),r.push({pull:.45,push:.55,label:`push_peak`})):(r.push({pull:.35,push:.65,label:`push_focus`}),r.push({pull:.45,push:.55,label:`push_maintain_pull_build`}),r.push({pull:.65,push:.35,label:`pull_focus`}),r.push({pull:.55,push:.45,label:`pull_peak`})),r}function x(e,t,n){let{pullUpMax:r,pushUpMax:i}=e,a=t.pullUps,o=t.pushUps,s=n.pull,c=n.push,l=r,u=i,d=[],f=v(r,a,s,`pull`)+v(i,o,c,`push`),p=Math.max(f,12);for(let e=0;e<p;e++)d.push({week:e+1,pullEstimate:Math.round(l*10)/10,pushEstimate:Math.round(u*10)/10}),(e+1)%4==0?(l+=g,u+=_):(l+=m(l,s,e),u+=h(u,c,e)),l=Math.min(l,s),u=Math.min(u,c);return d}var S=.3;function C(e,t){let n=t===`pull`?.67:.55,r=(70/e)**n;return Math.round((t===`pull`?150:200)*r)}function w(e){if(!e)return 0;let{sets:t,reps:n,type:r,parts:i}=e;return r===`cluster`&&i||r===`ladder`&&i?t*i.reduce((e,t)=>e+t.reps,0):t*n}function T(e){let t=0,n=0;for(let r of e){let e=w(r);r.group===`pull`?t+=e:r.group===`push`&&(n+=e)}return{pull:t,push:n,total:t+n}}function E(e){let t=0,n=0;for(let r of e){let e=T(r.exercises||[]);t+=e.pull,n+=e.push}return{pull:t,push:n,total:t+n}}function D(e){switch(e){case 1:return .8;case 2:return .9;case 3:return 1;case 4:return S;default:return 1}}function O(e,t){return e===0?!0:(t-e)/e<=.3}function k(e){let t=0;for(let n of e){let e=n.sets||1,r=n.reps||1,i=n.rest||60,a=(n.tempo||`20X1`).replace(/X/gi,`1`).split(``).map(Number),o=(a[0]||2)+(a[1]||0)+(a[2]||1)+(a[3]||0);if(n.type===`cluster`&&n.parts){for(let r of n.parts){let n=r.reps||1;t+=e*n*o,r.rest>0&&(t+=e*r.rest)}t+=(e-1)*i}else if(n.type===`ladder`&&n.parts){for(let r of n.parts){let n=r.reps||1;t+=e*n*o,r.rest>0&&(t+=e*r.rest)}t+=(e-1)*i}else if(n.type===`emom`){let r=n.emomInterval||60;t+=e*r}else t+=e*r*o,t+=(e-1)*i}return t+=600,Math.round(t/60)}function A(e){let t=(70/e)**.33;return Math.round(t*100)/100}var j={pull_up:{id:`pull_up`,name:`Подтягивания`,nameEn:`Pull-ups`,group:`pull`,type:`regular`,difficulty:1,muscles:[`latissimus`,`biceps`,`rhomboids`,`core`],isPrehab:!1,fixedReps:!1},pull_up_reverse:{id:`pull_up_reverse`,name:`Подтягивания обратным хватом`,nameEn:`Reverse-grip pull-ups`,group:`pull`,type:`regular`,difficulty:1,muscles:[`latissimus`,`biceps`,`rhomboids`],isPrehab:!1,fixedReps:!0},pull_up_wide:{id:`pull_up_wide`,name:`Подтягивания широким хватом`,nameEn:`Wide-grip pull-ups`,group:`pull`,type:`regular`,difficulty:2,muscles:[`latissimus`,`teres_major`,`rhomboids`],isPrehab:!1,fixedReps:!1},pull_up_cluster:{id:`pull_up_cluster`,name:`Подтягивания (кластер)`,nameEn:`Pull-ups (cluster)`,group:`pull`,type:`cluster`,difficulty:2,muscles:[`latissimus`,`biceps`,`rhomboids`,`core`],isPrehab:!1,fixedReps:!0},pull_up_ladder:{id:`pull_up_ladder`,name:`Подтягивания (лестница)`,nameEn:`Pull-ups (ladder)`,group:`pull`,type:`ladder`,difficulty:2,muscles:[`latissimus`,`biceps`,`rhomboids`,`core`],isPrehab:!1,fixedReps:!0},chin_up:{id:`chin_up`,name:`Подтягивания параллельным хватом`,nameEn:`Chin-ups (parallel/neutral grip)`,group:`pull`,type:`regular`,difficulty:1,muscles:[`latissimus`,`biceps`,`brachialis`],isPrehab:!1,fixedReps:!1},australian_pull:{id:`australian_pull`,name:`Австралийские подтягивания`,nameEn:`Australian pull-ups (inverted rows)`,group:`pull`,type:`regular`,difficulty:0,muscles:[`latissimus`,`rhomboids`,`rear_delts`],isPrehab:!1,fixedReps:!1},push_up:{id:`push_up`,name:`Отжимания`,nameEn:`Push-ups`,group:`push`,type:`regular`,difficulty:1,muscles:[`pectoralis`,`anterior_deltoid`,`triceps`],isPrehab:!1,fixedReps:!1},push_up_cluster:{id:`push_up_cluster`,name:`Отжимания (кластер)`,nameEn:`Push-ups (cluster)`,group:`push`,type:`cluster`,difficulty:2,muscles:[`pectoralis`,`anterior_deltoid`,`triceps`],isPrehab:!1,fixedReps:!0},push_up_ladder:{id:`push_up_ladder`,name:`Отжимания (лестница)`,nameEn:`Push-ups (ladder)`,group:`push`,type:`ladder`,difficulty:2,muscles:[`pectoralis`,`anterior_deltoid`,`triceps`],isPrehab:!1,fixedReps:!0},push_up_wide:{id:`push_up_wide`,name:`Отжимания широким хватом`,nameEn:`Wide push-ups`,group:`push`,type:`regular`,difficulty:1,muscles:[`pectoralis`,`anterior_deltoid`],isPrehab:!1,fixedReps:!1},push_up_diamond:{id:`push_up_diamond`,name:`Алмазные отжимания`,nameEn:`Diamond push-ups`,group:`push`,type:`regular`,difficulty:2,muscles:[`triceps`,`anterior_deltoid`,`pectoralis`],isPrehab:!1,fixedReps:!1},push_up_decline:{id:`push_up_decline`,name:`Отжимания ноги сверху`,nameEn:`Decline push-ups`,group:`push`,type:`regular`,difficulty:2,muscles:[`anterior_deltoid`,`upper_pectoralis`,`triceps`],isPrehab:!1,fixedReps:!1},push_up_archer:{id:`push_up_archer`,name:`Отжимания лучника`,nameEn:`Archer push-ups`,group:`push`,type:`regular`,difficulty:3,muscles:[`pectoralis`,`anterior_deltoid`,`triceps`,`core`],isPrehab:!1,fixedReps:!0},face_pull:{id:`face_pull`,name:`Фейс-пулл с эспандером`,nameEn:`Band face pull`,group:`pull`,type:`regular`,difficulty:0,muscles:[`rear_delts`,`rotator_cuff`,`mid_traps`],isPrehab:!0,fixedReps:!0},y_raise:{id:`y_raise`,name:`Y-подъёмы`,nameEn:`Y-raises`,group:`pull`,type:`regular`,difficulty:0,muscles:[`lower_traps`,`rotator_cuff`],isPrehab:!0,fixedReps:!0},external_rotation:{id:`external_rotation`,name:`Внешняя ротация плеча`,nameEn:`Shoulder external rotation`,group:`pull`,type:`regular`,difficulty:0,muscles:[`rotator_cuff`,`infraspinatus`],isPrehab:!0,fixedReps:!0},scapular_pull:{id:`scapular_pull`,name:`Скапулярные подтягивания`,nameEn:`Scapular pull-ups`,group:`pull`,type:`regular`,difficulty:0,muscles:[`lower_traps`,`serratus_anterior`],isPrehab:!0,fixedReps:!0},test_pull:{id:`test_pull`,name:`Тест: макс. подтягивания`,nameEn:`Test: max pull-ups`,group:`pull`,type:`test`,difficulty:0,muscles:[],isPrehab:!1,fixedReps:!0},test_push:{id:`test_push`,name:`Тест: макс. отжимания`,nameEn:`Test: max push-ups`,group:`push`,type:`test`,difficulty:0,muscles:[],isPrehab:!1,fixedReps:!0}},M=`mon`,N=`wed`,P=`fri`;function ee(e,t,n,r,i,a,o){let{weight:s,age:c}=n,l=A(s),u=C(s,`pull`),d=C(s,`push`),f=[],p=r,g=i;for(let n=0;n<3;n++){let r=F(e,n,t,p,g,a,o,s,l,u,d);f.push(r);for(let t=0;t<4;t++)t<3&&(p+=m(p,a,e*12+n*4+t),g+=h(g,o,e*12+n*4+t)),p=Math.min(p,a),g=Math.min(g,o)}return{index:e,emphasis:t,mesocycles:f,startPull:r,endPull:Math.round(p*10)/10,startPush:i,endPush:Math.round(g*10)/10}}function F(e,t,n,r,i,a,o,s,c,l,u){let d=[];for(let f=1;f<=4;f++){let p=f===4,m=D(f),h=Math.round(l*n.pull*c),g=Math.round(u*n.push*c),_=Math.round(h*m),v=Math.round(g*m),y=I(e,t,f,p,r,i,a,o,_,v,s,n);d.push({week:e*12+t*4+f,weekInMeso:f,isDeload:p,volFactor:m,pullTarget:_,pushTarget:v,sessions:y})}return{index:t,macroIndex:e,weeks:d,emphasis:n}}function I(e,t,n,r,i,a,o,s,c,l,u,d){let f=[];return f.push(z(i,a,o,s,c,l,r,u,e,t,n)),f.push(B(i,a,o,s,c,l,r,u,e,t,n)),f.push(V(i,a,o,s,c,l,r,u,e,t,n)),f}function L(e,t,n){return n?e:e+(t-1)}function R(e,t){return t===4?Math.max(1,Math.round(e*S)):e}function z(e,t,n,r,i,a,o,s,c,l,u){if(o)return H(M,e,t,s);let d=Math.max(3,Math.round(e*.65)),f=Math.max(5,Math.round(t*.55)),p=[];return p.push({...j.pull_up,sets:R(4,u),reps:L(d,u,!1),rest:120,tempo:`20X1`,supersetGroup:`A`,supersetOrder:1}),p.push({...j.push_up,sets:R(4,u),reps:L(f,u,!1),rest:120,tempo:`20X1`,supersetGroup:`A`,supersetOrder:2}),p.push({...j.pull_up_reverse,sets:R(3,u),reps:L(Math.min(6,Math.round(e*.4)),u,!0),rest:90,tempo:`20X1`,supersetGroup:`B`,supersetOrder:1}),p.push({...j.push_up_wide,sets:R(3,u),reps:L(Math.round(f*.9),u,!1),rest:90,tempo:`20X1`,supersetGroup:`B`,supersetOrder:2}),p.push({...j.face_pull,sets:2,reps:15,rest:60,tempo:`2010`}),{day:M,label:`Пн — Силовой (антагонистические суперсеты)`,exercises:p,isDeload:!1}}function B(e,t,n,r,i,a,o,s,c,l,u){if(o)return H(N,e,t,s);let d=c*12+l*4+u<=8,f=Math.max(2,Math.round(e*.35)),p=Math.max(3,Math.round(t*.3)),m=[];return d?(m.push({...j.pull_up_cluster,sets:4,type:`cluster`,parts:[{reps:f,rest:15},{reps:f,rest:0}],rest:180,tempo:`10X1`,isClusterSuperset:!0,clusterSupersetGroup:`П`}),m.push({...j.push_up_cluster,sets:4,type:`cluster`,parts:[{reps:p,rest:15},{reps:p,rest:0}],rest:180,tempo:`10X1`,isClusterSuperset:!0,clusterSupersetGroup:`П`})):(m.push({...j.pull_up,sets:R(4,u),reps:L(Math.round(e*.55),u,!1),rest:90,tempo:`20X1`,supersetGroup:`A`,supersetOrder:1}),m.push({...j.push_up,sets:R(4,u),reps:L(Math.round(t*.5),u,!1),rest:90,tempo:`20X1`,supersetGroup:`A`,supersetOrder:2})),m.push({...j.y_raise,sets:2,reps:12,rest:60,tempo:`2010`}),m.push({...j.external_rotation,sets:2,reps:12,rest:60,tempo:`2010`}),{day:N,label:d?`Ср — Кластер-суперсеты`:`Ср — Суперсеты`,exercises:m,isDeload:!1}}function V(e,t,n,r,i,a,o,s,c,l,u){if(o)return H(P,e,t,s);let d=[],f=Math.min(5,Math.round(e*.25)),p=Math.min(7,Math.round(t*.2)),m=[],h=[];for(let e=1;e<=f;e++)m.push({reps:e,rest:15});for(let e=1;e<=p;e++)h.push({reps:e,rest:10});d.push({...j.pull_up_ladder,sets:R(3,u),type:`ladder`,parts:m,rest:120,tempo:`20X1`}),d.push({...j.push_up_ladder,sets:R(3,u),type:`ladder`,parts:h,rest:90,tempo:`20X1`});let g=Math.max(2,Math.round(e*.3)),_=Math.max(4,Math.round(t*.25));return d.push({...j.pull_up,sets:5,reps:g,type:`emom`,rest:0,tempo:`20X0`,emomInterval:60,fixedReps:!0}),d.push({...j.push_up,sets:5,reps:_,type:`emom`,rest:0,tempo:`20X0`,emomInterval:60,fixedReps:!0}),d.push({...j.scapular_pull,sets:2,reps:8,rest:60,tempo:`10X1`}),{day:P,label:`Пт — Объём (лестницы + EMOM)`,exercises:d,isDeload:!1}}function H(e,t,n,r){let i=[];return i.push({...j.pull_up,sets:2,reps:Math.max(3,Math.round(t*.5)),rest:120,tempo:`30X1`}),i.push({...j.push_up,sets:2,reps:Math.max(5,Math.round(n*.4)),rest:120,tempo:`30X1`}),i.push({...j.face_pull,sets:2,reps:15,rest:60,tempo:`2010`}),i.push({...j.y_raise,sets:2,reps:12,rest:60,tempo:`2010`}),{day:e,label:{mon:`Пн — Разгрузка`,wed:`Ср — Разгрузка`,fri:`Пт — Разгрузка`}[e]||`Разгрузка`,exercises:i,isDeload:!0}}function U(e,t){let n=u(e),r=f(e,t),i=c(e.weight,e.age),o=l(e.weight,e.age),s=a(e.age),d=Math.round(i.eli*s),p=Math.round(o.eli*s),m={pullUps:r.pull.capped,pushUps:r.push.capped},h=m.pullUps-e.pullUpMax,g=m.pushUps-e.pushUpMax,_=Math.max(y(e.pullUpMax,m.pullUps,d),y(e.pushUpMax,m.pushUps,p)),v=b(h,g,_),S=[],C=e.pullUpMax,w=e.pushUpMax;for(let t=0;t<_;t++){let n=ee(t,v[t],e,C,w,d,p);S.push(n),C=n.endPull,w=n.endPush}let T=W(S,e),E=x(e,m,{pull:d,push:p});return{profile:e,goals:m,originalGoals:t,eligibility:n,goalValidation:r,ceilings:{pull:d,push:p},macrocycleCount:_,emphases:v,macrocycles:S,validation:T,progression:E,totalWeeks:_*12}}function W(e,t){let n=[],{weight:r}=t,i=C(r,`pull`),a=C(r,`push`),o=0;for(let t of e)for(let e of t.mesocycles)for(let t of e.weeks){let e=E(t.sessions.flatMap(e=>e.exercises||[]));e.pull>i&&!t.isDeload&&n.push({type:`MRV_EXCEEDED`,severity:`high`,week:t.week,exercise:`pull`,volume:e.pull,limit:i,message:`Pull volume ${e.pull} exceeds MRV ${i} on week ${t.week}`}),e.push>a&&!t.isDeload&&n.push({type:`MRV_EXCEEDED`,severity:`high`,week:t.week,exercise:`push`,volume:e.push,limit:a,message:`Push volume ${e.push} exceeds MRV ${a} on week ${t.week}`}),o>0&&!t.isDeload&&o>0&&(O(o,e.pull)||n.push({type:`VOLUME_JUMP`,severity:`medium`,week:t.week,exercise:`pull`,prevVolume:o,newVolume:e.pull,message:`Pull volume jump ${(e.pull/o-1)*100}% on week ${t.week}`}));for(let e of t.sessions){let r=k(e.exercises||[]);r>90&&n.push({type:`SESSION_TOO_LONG`,severity:`high`,week:t.week,day:e.day,duration:r,limit:90,message:`${e.day.toUpperCase()} session ${r}min exceeds 90min cap on week ${t.week}`})}o=t.isDeload?0:e.pull,t.isDeload||e.push}return{passed:n.filter(e=>e.severity===`high`).length===0,issues:n,issueCount:n.length,highSeverityCount:n.filter(e=>e.severity===`high`).length}}function G(e){let t=[];for(let n of e.macrocycles)for(let e of n.mesocycles)for(let r of e.weeks)for(let i of r.sessions)for(let a of i.exercises||[]){let o=a.type===`cluster`||a.type===`ladder`?(a.parts||[]).reduce((e,t)=>e+t.reps,0)*a.sets:a.sets*a.reps;t.push({macro:n.index+1,meso:e.index+1,week:r.week,weekInMeso:r.weekInMeso,isDeload:r.isDeload,day:i.day,exercise:a.name,exerciseEn:a.nameEn||a.id,group:a.group,type:a.type||`regular`,sets:a.sets,reps:a.reps||(a.parts||[]).map(e=>e.reps).join(`+`),volume:o,rest:a.rest,tempo:a.tempo,isPrehab:a.isPrehab||!1,fixedReps:a.fixedReps||!1,supersetGroup:a.supersetGroup||null,emphasis:n.emphasis.label})}return t}var K=`input`,q=null;function J(){let e=document.getElementById(`app`);e.innerHTML=`
    <div class="app-container">
      ${Y()}
      <div class="main-content">
        ${K===`input`?X():``}
        ${K===`program`?Z():``}
        ${K===`science`?Q():``}
      </div>
    </div>
  `,ue()}function Y(){return`
    <nav class="sidebar">
      <div class="sidebar-title">Training Matrix</div>
      <ul class="sidebar-nav">
        ${[{id:`input`,icon:`&#128221;`,label:`Профиль`},{id:`program`,icon:`&#127947;`,label:`Программа`},{id:`science`,icon:`&#128300;`,label:`Наука`}].map(e=>`
          <li>
            <a href="#" data-nav="${e.id}" class="${K===e.id?`active`:``}">
              <span class="nav-icon">${e.icon}</span>
              ${e.label}
            </a>
          </li>
        `).join(``)}
      </ul>
    </nav>
  `}function X(){return`
    <div class="page fade-in">
      <h1 class="page-title">Профиль атлета</h1>
      <p class="page-subtitle">Введите параметры для генерации адаптивной программы тренировок</p>

      <div class="form-grid" id="athlete-form">
        <div class="form-group">
          <label class="form-label">Вес (кг)</label>
          <input type="number" class="form-input" id="weight" placeholder="100" min="40" max="150" value="100">
        </div>
        <div class="form-group">
          <label class="form-label">Возраст</label>
          <input type="number" class="form-input" id="age" placeholder="30" min="15" max="65" value="30">
        </div>
        <div class="form-group">
          <label class="form-label">Пол</label>
          <select class="form-input" id="sex">
            <option value="male">Мужской</option>
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">Макс. подтягивания</label>
          <input type="number" class="form-input" id="pullUpMax" placeholder="20" min="0" max="60" value="20">
        </div>
        <div class="form-group">
          <label class="form-label">Макс. отжимания</label>
          <input type="number" class="form-input" id="pushUpMax" placeholder="50" min="0" max="200" value="50">
        </div>
        <div class="form-group">
          <label class="form-label">Цель: подтягивания</label>
          <input type="number" class="form-input" id="goalPull" placeholder="28" min="0" max="60" value="28">
        </div>
        <div class="form-group">
          <label class="form-label">Цель: отжимания</label>
          <input type="number" class="form-input" id="goalPush" placeholder="59" min="0" max="200" value="59">
        </div>
      </div>

      <div style="margin-top: var(--space-6);">
        <button class="btn btn-primary" id="generate-btn">Сгенерировать программу</button>
      </div>

      <div id="eligibility-result" style="margin-top: var(--space-6);"></div>
    </div>
  `}function Z(){if(!q)return`
      <div class="page">
        <div class="empty-state">
          <div class="empty-state-icon">&#128203;</div>
          <div class="empty-state-text">Программа ещё не сгенерирована</div>
          <div class="empty-state-hint">Заполните профиль и нажмите кнопку генерации</div>
        </div>
      </div>
    `;let{profile:e,goals:t,originalGoals:n,eligibility:r,goalValidation:i,ceilings:a,macrocycleCount:o,emphases:s,macrocycles:c,validation:l,progression:u,totalWeeks:d}=q;return`
    <div class="page fade-in">
      <h1 class="page-title">Программа тренировок</h1>
      <p class="page-subtitle">${e.weight} кг / ${e.age} лет / подтягивания ${e.pullUpMax} &rarr; ${t.pullUps} / отжимания ${e.pushUpMax} &rarr; ${t.pushUps}</p>

      ${$(r)}
      ${te(i,n)}

      <div class="stat-grid fade-in-delay-1">
        <div class="stat-card">
          <div class="stat-value">${o}</div>
          <div class="stat-label">Макроциклов</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">${d}</div>
          <div class="stat-label">Недель</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">${a.pull}</div>
          <div class="stat-label">Потолок подтяг.</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">${a.push}</div>
          <div class="stat-label">Потолок отжим.</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">${Math.round(A(e.weight)*100)}%</div>
          <div class="stat-label">BW масштаб</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">${C(e.weight,`pull`)}/${C(e.weight,`push`)}</div>
          <div class="stat-label">MRV pull/push</div>
        </div>
      </div>

      <hr class="divider" />

      ${ne(s,o)}

      <h2 class="section-title fade-in-delay-2">Прогрессия</h2>
      <div class="chart-container fade-in-delay-2">
        ${re(u,t,a)}
      </div>

      <hr class="divider" />

      <h2 class="section-title fade-in-delay-3">Макроциклы</h2>
      <div class="section-description">Нажмите на макроцикл, чтобы раскрыть детали</div>
      ${c.map((e,t)=>ie(e,t)).join(``)}

      <hr class="divider" />

      <h2 class="section-title fade-in-delay-4">Валидация</h2>
      ${le(l)}

      <hr class="divider" />

      <div style="margin-top: var(--space-6);">
        <button class="btn" id="export-csv-btn">Экспорт CSV</button>
        <button class="btn" id="back-to-input-btn" style="margin-left: var(--space-2);">Изменить профиль</button>
      </div>
    </div>
  `}function Q(){return`
    <div class="page fade-in">
      <h1 class="page-title">Научная база</h1>
      <p class="page-subtitle">Источники и обоснования для матрицы тренировок</p>

      <div class="section-title">Нормативные данные: подтягивания</div>
      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>Вес (кг)</th>
              <th>Нов.</th>
              <th>Сред.</th>
              <th>Прод.</th>
              <th>Элит.</th>
            </tr>
          </thead>
          <tbody>
            ${[70,80,90,100,110,120].map(e=>{let t=c(e,30);return`<tr><td class="num">`+e+`</td><td class="num">`+t.nov+`</td><td class="num">`+t.int+`</td><td class="num">`+t.adv+`</td><td class="num">`+t.eli+`</td></tr>`}).join(``)}
          </tbody>
        </table>
      </div>
      <div class="section-description" style="margin-bottom: var(--space-6);">Муж., 30 лет. Источник: Strength Level (4.8M lifts)</div>

      <div class="section-title">Факторы возраста</div>
      <div class="table-container">
        <table>
          <thead>
            <tr><th>Возраст</th><th>Фактор</th></tr>
          </thead>
          <tbody>
            <tr><td class="num">20-40</td><td class="num">1.00</td></tr>
            <tr><td class="num">41-45</td><td class="num">0.85</td></tr>
            <tr><td class="num">46-50</td><td class="num">0.65</td></tr>
            <tr><td class="num">51-55</td><td class="num">0.50</td></tr>
            <tr><td class="num">56-60</td><td class="num">0.30</td></tr>
          </tbody>
        </table>
      </div>
      <div class="section-description" style="margin-bottom: var(--space-6);">Источник: Kjaer et al. (2016)</div>

      <div class="section-title">Ключевые исследования</div>
      <div style="font-size: var(--text-sm); line-height: var(--lh-relaxed); color: var(--fg-secondary);">
        <ul style="padding-left: var(--space-5); margin-bottom: var(--space-4);">
          <li style="margin-bottom: var(--space-2);"><strong>Vanderburgh (2006, 2007)</strong> &mdash; Allometric scaling: 1RM ~ M^(2/3). BW penalty 15-20% for 60kg vs 90kg</li>
          <li style="margin-bottom: var(--space-2);"><strong>Sanchez-Moreno et al. (2016)</strong> &mdash; Pull-ups: r = -0.55 with body mass</li>
          <li style="margin-bottom: var(--space-2);"><strong>Yu et al. (2021)</strong> &mdash; Cluster sets better weeks 1-8 (SMD=0.24), traditional better after 8 weeks (SMD=-1.54)</li>
          <li style="margin-bottom: var(--space-2);"><strong>Schoenfeld et al. (2023)</strong> &mdash; Finite muscular adaptation, logarithmic curve</li>
          <li style="margin-bottom: var(--space-2);"><strong>Rhea et al.; Barsuhn et al. (2024)</strong> &mdash; ~1/3 of peak volume maintains developed qualities</li>
          <li><strong>Cooper Institute (2013)</strong> &mdash; Push-up norms by age</li>
        </ul>
      </div>
    </div>
  `}function $(e){return e.eligible?`
      <div class="callout callout-success fade-in-delay-1">
        <span class="callout-icon">&#10003;</span>
        <div>
          <strong>Допуск получен</strong><br>
          Подтягивания: ${e.pull.max} (порог ${e.pull.threshold}) &mdash; ${e.pull.level}
          <br>Отжимания: ${e.push.max} (порог ${e.push.threshold}) &mdash; ${e.push.level}
        </div>
      </div>
    `:`
    <div class="callout callout-error fade-in-delay-1">
      <span class="callout-icon">&#10007;</span>
      <div>
        <strong>Недостаточный уровень</strong><br>
        Подтягивания: ${e.pull.max} (нужно ${e.pull.threshold}) &mdash; ${e.pull.level}
        <br>Отжимания: ${e.push.max} (нужно ${e.push.threshold}) &mdash; ${e.push.level}
        <br><em>Для спортсменов ниже Intermediate уровня достаточно самостоятельных тренировок.</em>
      </div>
    </div>
  `}function te(e,t){let n=[];if(e.pull.warning){let r=e.pull.warning===`capped_at_95pct_ceiling`?`Цель подтягиваний `+t.pullUps+` превышает потолок &mdash; ограничено до `+e.pull.capped:`Цель подтягиваний `+t.pullUps+` близка к потолку (`+Math.round(e.pull.ratio*100)+`%)`;n.push(r)}if(e.push.warning){let r=e.push.warning===`capped_at_95pct_ceiling`?`Цель отжиманий `+t.pushUps+` превышает потолок &mdash; ограничено до `+e.push.capped:`Цель отжиманий `+t.pushUps+` близка к потолку (`+Math.round(e.push.ratio*100)+`%)`;n.push(r)}return n.length===0?``:`
    <div class="callout callout-warning fade-in-delay-1">
      <span class="callout-icon">&#9888;</span>
      <div>${n.join(`<br>`)}</div>
    </div>
  `}function ne(e,t){return`
    <h2 class="section-title fade-in-delay-2">Распределение акцентов</h2>
    <div class="table-container fade-in-delay-2">
      <table>
        <thead>
          <tr>
            <th>Макроцикл</th>
            <th>Подтягивания</th>
            <th>Отжимания</th>
            <th>Тип</th>
          </tr>
        </thead>
        <tbody>
          ${e.map((e,t)=>`
            <tr>
              <td class="num">${t+1}</td>
              <td class="num">${Math.round(e.pull*100)}%</td>
              <td class="num">${Math.round(e.push*100)}%</td>
              <td><span class="badge badge-blue">${e.label}</span></td>
            </tr>
          `).join(``)}
        </tbody>
      </table>
    </div>
  `}function re(e,t,n){let r={top:20,right:20,bottom:30,left:40},i=800-r.left-r.right,a=180-r.top-r.bottom,o=e.length,s=Math.max(n.pull,t.pullUps)+5,c=Math.max(n.push,t.pushUps)+10,l=e=>r.left+e/o*i,u=e=>r.top+a-e/s*a,d=e=>r.top+a-e/c*a,f=e.map((e,t)=>l(t)+`,`+u(e.pullEstimate)).join(` `),p=e.map((e,t)=>l(t)+`,`+d(e.pushEstimate)).join(` `),m=u(t.pullUps),h=d(t.pushUps),g=u(n.pull),_=d(n.push),v=e.filter((e,t)=>(t+1)%4==0).map((e,t)=>{let n=l(t*4+3);return`<line x1="`+n+`" y1="`+r.top+`" x2="`+n+`" y2="`+(r.top+a)+`" stroke="#e8e8e6" stroke-width="1" stroke-dasharray="3,3" />`}).join(``),y=[];for(let e=0;e<o;e+=4)y.push(`<text x="`+l(e)+`" y="175" text-anchor="middle" fill="#9b9a97" font-size="10" font-family="SFMono-Regular, Menlo, monospace">`+(e+1)+`</text>`);return`
    <svg viewBox="0 0 800 180" class="chart-canvas" preserveAspectRatio="xMidYMid meet">
      ${v}
      <line x1="${r.left}" y1="${g}" x2="${800-r.right}" y2="${g}" stroke="#dfdfde" stroke-width="1" stroke-dasharray="6,3" />
      <line x1="${r.left}" y1="${_}" x2="${800-r.right}" y2="${_}" stroke="#dfdfde" stroke-width="1" stroke-dasharray="6,3" />
      <line x1="${r.left}" y1="${m}" x2="${800-r.right}" y2="${m}" stroke="#2383e2" stroke-width="1" stroke-dasharray="4,4" />
      <line x1="${r.left}" y1="${h}" x2="${800-r.right}" y2="${h}" stroke="#4dab6f" stroke-width="1" stroke-dasharray="4,4" />
      <polyline points="${f}" fill="none" stroke="#2383e2" stroke-width="2" stroke-linejoin="round" />
      <polyline points="${p}" fill="none" stroke="#4dab6f" stroke-width="2" stroke-linejoin="round" />
      <line x1="${r.left}" y1="${r.top}" x2="${r.left}" y2="${r.top+a}" stroke="#e8e8e6" stroke-width="1" />
      <line x1="${r.left}" y1="${r.top+a}" x2="${800-r.right}" y2="${r.top+a}" stroke="#e8e8e6" stroke-width="1" />
      <text x="${r.left-5}" y="${m+4}" text-anchor="end" fill="#2383e2" font-size="10" font-family="SFMono-Regular, Menlo, monospace">${t.pullUps}</text>
      <text x="${800-r.right+5}" y="${h+4}" text-anchor="start" fill="#4dab6f" font-size="10" font-family="SFMono-Regular, Menlo, monospace">${t.pushUps}</text>
      <text x="${r.left-5}" y="${g+4}" text-anchor="end" fill="#9b9a97" font-size="9" font-family="SFMono-Regular, Menlo, monospace">${n.pull}</text>
      ${y.join(``)}
      <circle cx="${r.left+10}" cy="${r.top+5}" r="3" fill="#2383e2" />
      <text x="${r.left+18}" y="${r.top+9}" fill="#37352f" font-size="10" font-family="Plus Jakarta Sans, sans-serif">Подтягивания</text>
      <circle cx="${r.left+110}" cy="${r.top+5}" r="3" fill="#4dab6f" />
      <text x="${r.left+118}" y="${r.top+9}" fill="#37352f" font-size="10" font-family="Plus Jakarta Sans, sans-serif">Отжимания</text>
    </svg>
  `}function ie(e,t){let n=e.emphasis.label.replace(/_/g,` `);return`
    <div class="collapsible fade-in-delay-${Math.min(t+2,4)}" data-macro="${t}">
      <button class="collapsible-header" data-toggle="macro-${t}">
        <span class="toggle-icon">&#9654;</span>
        <span>Макроцикл ${t+1} &mdash; ${n}</span>
        <span style="margin-left: auto; font-size: var(--text-xs); color: var(--fg-tertiary);">
          Подт: ${e.startPull} &rarr; ${e.endPull} / Отж: ${e.startPush} &rarr; ${e.endPush}
        </span>
      </button>
      <div class="collapsible-body" id="macro-${t}">
        ${e.mesocycles.map((e,n)=>ae(e,n,t)).join(``)}
      </div>
    </div>
  `}function ae(e,t,n){return`
    <div style="margin-bottom: var(--space-4);">
      <div style="font-weight: 600; font-size: var(--text-sm); color: var(--fg-secondary); margin-bottom: var(--space-2);">
        Мезоцикл ${t+1}
      </div>
      ${e.weeks.map((e,t)=>oe(e,t)).join(``)}
    </div>
  `}function oe(e,t){let n=e.isDeload,r=n?`Неделя `+e.week+` &mdash; Разгрузка`:`Неделя `+e.week,i=n?`<span class="badge badge-orange">разгрузка</span>`:`<span class="badge badge-blue">`+Math.round(e.volFactor*100)+`%</span>`;return`
    <div class="week-header">
      <span class="week-number">Н${e.week}</span>
      <span style="font-size: var(--text-sm); font-weight: 500;">${r}</span>
      ${i}
    </div>
    ${e.sessions.map(e=>se(e,n)).join(``)}
  `}function se(e,t){return`
    <div class="session-card">
      <div class="session-header">
        <span class="day-badge">${{mon:`Пн`,wed:`Ср`,fri:`Пт`}[e.day]||e.day}</span>
        <span>${e.label}</span>
        ${t?`<span class="badge badge-orange" style="margin-left: auto;">30%</span>`:``}
      </div>
      <div class="table-container" style="border: none; border-radius: 0;">
        <table>
          <thead>
            <tr>
              <th>Упражнение</th>
              <th>Сеты</th>
              <th>Повторы</th>
              <th>Темп</th>
              <th>Отдых</th>
              <th>Тип</th>
            </tr>
          </thead>
          <tbody>
            ${e.exercises.map(e=>ce(e,t)).join(``)}
          </tbody>
        </table>
      </div>
    </div>
  `}function ce(e,t){let n=t?`deload-row`:``,r=``;e.supersetGroup&&(r=`<span class="superset-tag `+(e.supersetGroup===`A`?`superset-a`:`superset-b`)+`">`+e.supersetGroup+`</span>`),e.isClusterSuperset&&(r=`<span class="superset-tag superset-cluster">К</span>`);let i=``;i=e.type===`cluster`&&e.parts?e.parts.map(e=>e.reps).join(`+`):e.type===`ladder`&&e.parts?e.parts.map(e=>e.reps).join(`-`):e.type===`emom`?e.reps+` x `+e.sets+` раундов`:e.reps;let a=``;a=e.type===`emom`?`EMOM 60с`:e.type===`cluster`&&e.parts?(e.parts[0]&&e.parts[0].rest?e.parts[0].rest:15)+`с / `+e.rest+`с`:e.rest+`с`;let o=``;e.type===`cluster`?o=`<span class="badge badge-green">кластер</span>`:e.type===`ladder`?o=`<span class="badge badge-blue">лестница</span>`:e.type===`emom`?o=`<span class="badge badge-orange">EMOM</span>`:e.isPrehab?o=`<span class="badge badge-green">прехаб</span>`:e.type===`test`&&(o=`<span class="badge badge-red">тест</span>`);let s=e.fixedReps?` <span style="color:var(--fg-tertiary);font-size:10px;">&#9670;</span>`:``;return`
    <tr class="${n}">
      <td class="exercise-name">${r}${e.name}${s}</td>
      <td class="num">${e.sets}</td>
      <td class="num">${i}</td>
      <td class="tempo">${e.tempo||`&mdash;`}</td>
      <td class="num">${a}</td>
      <td>${o}</td>
    </tr>
  `}function le(e){if(e.passed)return`
      <div class="callout callout-success">
        <span class="callout-icon">&#10003;</span>
        <div><strong>Валидация пройдена</strong> &mdash; нет критических проблем с объёмом или MRV</div>
      </div>
    `;let t=e.issues.filter(e=>e.severity===`high`),n=e.issues.filter(e=>e.severity===`medium`);return`
    <div class="callout callout-error">
      <span class="callout-icon">&#10007;</span>
      <div>
        <strong>Обнаружены проблемы</strong> (${t.length} критических, ${n.length} средних)
        <ul style="margin-top: var(--space-2); padding-left: var(--space-4); font-size: var(--text-xs);">
          ${e.issues.map(e=>`<li>`+e.message+`</li>`).join(``)}
        </ul>
      </div>
    </div>
  `}function ue(){document.querySelectorAll(`[data-nav]`).forEach(e=>{e.addEventListener(`click`,e=>{e.preventDefault(),K=e.target.closest(`[data-nav]`).dataset.nav,J()})});let e=document.getElementById(`generate-btn`);e&&e.addEventListener(`click`,de),document.querySelectorAll(`[data-toggle]`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.dataset.toggle,n=document.getElementById(t);n&&(n.classList.toggle(`open`),e.classList.toggle(`open`))})});let t=document.getElementById(`export-csv-btn`);t&&t.addEventListener(`click`,fe);let n=document.getElementById(`back-to-input-btn`);n&&n.addEventListener(`click`,()=>{K=`input`,J()})}function de(){let e=parseInt(document.getElementById(`weight`).value)||100,t=parseInt(document.getElementById(`age`).value)||30,n=document.getElementById(`sex`).value||`male`,r=parseInt(document.getElementById(`pullUpMax`).value)||0,i=parseInt(document.getElementById(`pushUpMax`).value)||0,a=parseInt(document.getElementById(`goalPull`).value)||0,o=parseInt(document.getElementById(`goalPush`).value)||0,s={weight:e,age:t,sex:n,pullUpMax:r,pushUpMax:i},c={pullUps:a,pushUps:o},l=u(s),d=document.getElementById(`eligibility-result`);if(!l.eligible){d.innerHTML=$(l),q=null;return}try{q=U(s,c),K=`program`,J()}catch(e){let t=document.getElementById(`eligibility-result`);t&&(t.innerHTML=`
        <div class="callout callout-error">
          <span class="callout-icon">&#10007;</span>
          <div><strong>Ошибка генерации</strong><br>${e.message}</div>
        </div>
      `)}}function fe(){if(!q)return;let e=G(q),t=[`macro`,`meso`,`week`,`weekInMeso`,`isDeload`,`day`,`exercise`,`exerciseEn`,`group`,`type`,`sets`,`reps`,`volume`,`rest`,`tempo`,`isPrehab`,`fixedReps`,`supersetGroup`,`emphasis`],n=[t.join(`,`),...e.map(e=>t.map(t=>{let n=e[t];return typeof n==`string`&&n.includes(`,`)?`"`+n+`"`:n}).join(`,`))].join(`
`),r=new Blob([`﻿`+n],{type:`text/csv;charset=utf-8;`}),i=URL.createObjectURL(r),a=document.createElement(`a`);a.href=i,a.download=`training-matrix-`+q.profile.weight+`kg.csv`,a.click(),URL.revokeObjectURL(i)}J();