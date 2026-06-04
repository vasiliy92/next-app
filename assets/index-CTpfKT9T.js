(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e={50:{beg:0,nov:5,int:15,adv:27,eli:40},55:{beg:0,nov:6,int:15,adv:26,eli:39},60:{beg:0,nov:6,int:15,adv:26,eli:37},65:{beg:0,nov:6,int:15,adv:25,eli:36},70:{beg:0,nov:6,int:14,adv:24,eli:35},75:{beg:0,nov:6,int:14,adv:24,eli:34},80:{beg:0,nov:6,int:14,adv:23,eli:33},85:{beg:0,nov:6,int:13,adv:22,eli:32},90:{beg:0,nov:6,int:13,adv:21,eli:30},95:{beg:0,nov:6,int:12,adv:21,eli:29},100:{beg:0,nov:6,int:12,adv:20,eli:28},105:{beg:0,nov:5,int:11,adv:19,eli:27},110:{beg:0,nov:5,int:11,adv:18,eli:26},115:{beg:0,nov:5,int:10,adv:18,eli:25},120:{beg:0,nov:4,int:10,adv:17,eli:25},125:{beg:0,nov:4,int:10,adv:16,eli:24},130:{beg:0,nov:4,int:9,adv:16,eli:23},135:{beg:0,nov:4,int:9,adv:15,eli:22},140:{beg:0,nov:3,int:9,adv:15,eli:21}},t={15:{beg:0,nov:0,int:8,adv:17,eli:27},20:{beg:0,nov:4,int:13,adv:24,eli:36},25:{beg:0,nov:5,int:14,adv:25,eli:37},30:{beg:0,nov:5,int:14,adv:25,eli:37},35:{beg:0,nov:5,int:14,adv:25,eli:37},40:{beg:0,nov:5,int:14,adv:25,eli:37},45:{beg:0,nov:3,int:12,adv:22,eli:34},50:{beg:0,nov:1,int:9,adv:19,eli:30},55:{beg:0,nov:0,int:7,adv:16,eli:26},60:{beg:0,nov:0,int:4,adv:12,eli:21},65:{beg:0,nov:0,int:1,adv:8,eli:16}},n={50:{beg:0,nov:16,int:42,adv:73,eli:108},55:{beg:0,nov:17,int:42,adv:72,eli:105},60:{beg:1,nov:18,int:42,adv:70,eli:102},65:{beg:2,nov:19,int:42,adv:69,eli:99},70:{beg:3,nov:19,int:41,adv:67,eli:96},75:{beg:4,nov:19,int:41,adv:66,eli:93},80:{beg:5,nov:20,int:40,adv:64,eli:91},85:{beg:5,nov:20,int:39,adv:63,eli:88},90:{beg:5,nov:19,int:39,adv:61,eli:86},95:{beg:6,nov:19,int:38,adv:60,eli:83},100:{beg:6,nov:19,int:37,adv:58,eli:81},105:{beg:6,nov:19,int:37,adv:57,eli:79},110:{beg:6,nov:19,int:36,adv:56,eli:77},115:{beg:6,nov:18,int:35,adv:54,eli:75},120:{beg:6,nov:18,int:34,adv:53,eli:73},125:{beg:6,nov:18,int:34,adv:52,eli:71},130:{beg:6,nov:17,int:33,adv:51,eli:70},135:{beg:6,nov:17,int:32,adv:49,eli:68},140:{beg:6,nov:17,int:32,adv:48,eli:66}},r={15:{beg:0,nov:11,int:30,adv:54,eli:80},20:{beg:0,nov:16,int:39,adv:66,eli:95},25:{beg:1,nov:18,int:41,adv:68,eli:99},30:{beg:1,nov:18,int:41,adv:68,eli:99},35:{beg:1,nov:18,int:41,adv:68,eli:99},40:{beg:1,nov:18,int:41,adv:68,eli:99},45:{beg:0,nov:15,int:37,adv:63,eli:92},50:{beg:0,nov:12,int:33,adv:57,eli:84},55:{beg:0,nov:9,int:28,adv:50,eli:75},60:{beg:0,nov:7,int:23,adv:43,eli:66},65:{beg:0,nov:4,int:18,adv:36,eli:57},70:{beg:0,nov:0,int:13,adv:30,eli:48},75:{beg:0,nov:0,int:9,adv:24,eli:40},80:{beg:0,nov:0,int:6,adv:18,eli:33},85:{beg:0,nov:0,int:2,adv:13,eli:27},90:{beg:0,nov:0,int:0,adv:9,eli:21}},i={range_20_40:1,range_41_45:.85,range_46_50:.65,range_51_55:.5,range_56_60:.3};function a(e){return e<=40?i.range_20_40:e<=45?i.range_41_45:e<=50?i.range_46_50:e<=55?i.range_51_55:e<=60?i.range_56_60:.25}function o(e,t){let n=Object.keys(e).map(Number).sort((e,t)=>e-t);if(t<=n[0])return e[n[0]];if(t>=n[n.length-1])return e[n[n.length-1]];for(let r=0;r<n.length-1;r++)if(t>=n[r]&&t<=n[r+1]){let i=(t-n[r])/(n[r+1]-n[r]),a=e[n[r]],o=e[n[r+1]],s={};for(let e of Object.keys(a))s[e]=Math.round(a[e]+i*(o[e]-a[e]));return s}return e[n[n.length-1]]}function s(e,t){let n=Object.keys(e).map(Number).sort((e,t)=>e-t),r=n[0],i=Math.abs(t-n[0]);for(let e of n){let n=Math.abs(t-e);n<i&&(i=n,r=e)}return e[r]}function c(n,r){let i=o(e,n),a=s(t,r),c={};for(let e of Object.keys(i))c[e]=Math.min(i[e],a[e]);return c}function l(e,t){let i=o(n,e),a=s(r,t),c={};for(let e of Object.keys(i))c[e]=Math.min(i[e],a[e]);return c}function u(e){let{weight:t,age:n,sex:r,pullUpMax:i,pushUpMax:o}=e;if(r!==`male`&&r!==`female`)throw Error(`Unsupported sex: ${r}. Only male/female supported.`);if(t<40||t>150)throw Error(`Weight ${t}kg out of supported range (40-150kg)`);if(n<15||n>65)throw Error(`Age ${n} out of supported range (15-65)`);let s=c(t,n),u=l(t,n),f=a(n),p=Math.max(1,Math.round(s.int*f)),m=Math.max(1,Math.round(u.int*f)),h=i>=p,g=o>=m,_=d(i,s),v=d(o,u);return{eligible:h&&g,pull:{max:i,level:_,threshold:p,passed:h,norms:s},push:{max:o,level:v,threshold:m,passed:g,norms:u}}}function d(e,t){return e>=t.eli?`elite`:e>=t.adv?`advanced`:e>=t.int?`intermediate`:e>=t.nov?`novice`:`beginner`}function f(e,t){let{weight:n,age:r}=e,i=c(n,r),o=l(n,r),s=a(r),u=Math.round(i.eli*s),d=Math.round(o.eli*s),f={pull:{goal:t.pullUps,ceiling:u,ratio:t.pullUps/u,warning:null,capped:t.pullUps},push:{goal:t.pushUps,ceiling:d,ratio:t.pushUps/d,warning:null,capped:t.pushUps}};return f.pull.ratio>.9&&(f.pull.warning=`approaching_ceiling`),f.pull.ratio>1&&(f.pull.capped=Math.round(u*.95),f.pull.warning=`capped_at_95pct_ceiling`),f.push.ratio>.9&&(f.push.warning=`approaching_ceiling`),f.push.ratio>1&&(f.push.capped=Math.round(d*.95),f.push.warning=`capped_at_95pct_ceiling`),f}function p(e,t,n){return e>=t?0:((t-e)/t)**.6*Math.max(.7,1-n*.005)}function m(e,t,n){return .9*p(e,t,n)}function h(e,t,n){return 2.5*p(e,t,n)}var g=.05,_=.1;function v(e,t,n,r){let i=r===`pull`?m:h,a=r===`pull`?g:_,o=e,s=0;for(;o<t&&s<200;){let e=i(o,n,s);o+=e,s++,s%4==0&&(o+=a)}return Math.min(s,200)}function y(e,t,n){let r=(t-e)/n;return r<=.15?1:r<=.3?2:r<=.5?3:4}function ee(e,t,n){let r=[],i=e/(e+t),a=t/(e+t);return n===1?r.push({pull:.55,push:.45,label:`balanced`}):n===2?i>a?(r.push({pull:.65,push:.35,label:`pull_focus`}),r.push({pull:.4,push:.6,label:`push_focus`})):(r.push({pull:.4,push:.6,label:`push_focus`}),r.push({pull:.6,push:.4,label:`pull_focus`})):n===3?i>a?(r.push({pull:.65,push:.35,label:`pull_focus`}),r.push({pull:.5,push:.5,label:`balanced`}),r.push({pull:.35,push:.65,label:`push_focus`})):(r.push({pull:.35,push:.65,label:`push_focus`}),r.push({pull:.5,push:.5,label:`balanced`}),r.push({pull:.65,push:.35,label:`pull_focus`})):i>a?(r.push({pull:.65,push:.35,label:`pull_focus`}),r.push({pull:.55,push:.45,label:`pull_maintain_push_build`}),r.push({pull:.35,push:.65,label:`push_focus`}),r.push({pull:.45,push:.55,label:`push_peak`})):(r.push({pull:.35,push:.65,label:`push_focus`}),r.push({pull:.45,push:.55,label:`push_maintain_pull_build`}),r.push({pull:.65,push:.35,label:`pull_focus`}),r.push({pull:.55,push:.45,label:`pull_peak`})),r}function te(e,t,n){let{pullUpMax:r,pushUpMax:i}=e,a=t.pullUps,o=t.pushUps,s=n.pull,c=n.push,l=r,u=i,d=[],f=v(r,a,s,`pull`)+v(i,o,c,`push`),p=Math.max(f,12);for(let e=0;e<p;e++)d.push({week:e+1,pullEstimate:Math.round(l*10)/10,pushEstimate:Math.round(u*10)/10}),(e+1)%4==0?(l+=g,u+=_):(l+=m(l,s,e),u+=h(u,c,e)),l=Math.min(l,s),u=Math.min(u,c);return d}var b=.3;function x(e,t){let n=t===`pull`?.67:.55,r=(70/e)**n;return Math.round((t===`pull`?150:200)*r)}function S(e){if(!e)return 0;let{sets:t,reps:n,type:r,parts:i}=e;return r===`cluster`&&i||r===`ladder`&&i?t*i.reduce((e,t)=>e+t.reps,0):t*n}function C(e){let t=0,n=0;for(let r of e){let e=S(r);r.group===`pull`?t+=e:r.group===`push`&&(n+=e)}return{pull:t,push:n,total:t+n}}function w(e){let t=0,n=0;for(let r of e){let e=C(r.exercises||[]);t+=e.pull,n+=e.push}return{pull:t,push:n,total:t+n}}function ne(e){switch(e){case 1:return .8;case 2:return .9;case 3:return 1;case 4:return b;default:return 1}}function re(e,t){return e===0?!0:(t-e)/e<=.3}function T(e){let t=0;for(let n of e){let e=n.sets||1,r=n.reps||1,i=n.rest||60,a=(n.tempo||`20X1`).replace(/X/gi,`1`).split(``).map(Number),o=(a[0]||2)+(a[1]||0)+(a[2]||1)+(a[3]||0);if(n.type===`cluster`&&n.parts){for(let r of n.parts){let n=r.reps||1;t+=e*n*o,r.rest>0&&(t+=e*r.rest)}t+=(e-1)*i}else if(n.type===`ladder`&&n.parts){for(let r of n.parts){let n=r.reps||1;t+=e*n*o,r.rest>0&&(t+=e*r.rest)}t+=(e-1)*i}else if(n.type===`emom`){let r=n.emomInterval||60;t+=e*r}else t+=e*r*o,t+=(e-1)*i}return t+=600,Math.round(t/60)}function ie(e){let t=(70/e)**.33;return Math.round(t*100)/100}var E={pull_up:{id:`pull_up`,name:`Подтягивания`,nameEn:`Pull-ups`,group:`pull`,type:`regular`,difficulty:1,muscles:[`latissimus`,`biceps`,`rhomboids`,`core`],isPrehab:!1,fixedReps:!1},pull_up_reverse:{id:`pull_up_reverse`,name:`Подтягивания обратным хватом`,nameEn:`Reverse-grip pull-ups`,group:`pull`,type:`regular`,difficulty:1,muscles:[`latissimus`,`biceps`,`rhomboids`],isPrehab:!1,fixedReps:!0},pull_up_wide:{id:`pull_up_wide`,name:`Подтягивания широким хватом`,nameEn:`Wide-grip pull-ups`,group:`pull`,type:`regular`,difficulty:2,muscles:[`latissimus`,`teres_major`,`rhomboids`],isPrehab:!1,fixedReps:!1},pull_up_cluster:{id:`pull_up_cluster`,name:`Подтягивания (кластер)`,nameEn:`Pull-ups (cluster)`,group:`pull`,type:`cluster`,difficulty:2,muscles:[`latissimus`,`biceps`,`rhomboids`,`core`],isPrehab:!1,fixedReps:!0},pull_up_ladder:{id:`pull_up_ladder`,name:`Подтягивания (лестница)`,nameEn:`Pull-ups (ladder)`,group:`pull`,type:`ladder`,difficulty:2,muscles:[`latissimus`,`biceps`,`rhomboids`,`core`],isPrehab:!1,fixedReps:!0},chin_up:{id:`chin_up`,name:`Подтягивания параллельным хватом`,nameEn:`Chin-ups (parallel/neutral grip)`,group:`pull`,type:`regular`,difficulty:1,muscles:[`latissimus`,`biceps`,`brachialis`],isPrehab:!1,fixedReps:!1},australian_pull:{id:`australian_pull`,name:`Австралийские подтягивания`,nameEn:`Australian pull-ups (inverted rows)`,group:`pull`,type:`regular`,difficulty:0,muscles:[`latissimus`,`rhomboids`,`rear_delts`],isPrehab:!1,fixedReps:!1},push_up:{id:`push_up`,name:`Отжимания`,nameEn:`Push-ups`,group:`push`,type:`regular`,difficulty:1,muscles:[`pectoralis`,`anterior_deltoid`,`triceps`],isPrehab:!1,fixedReps:!1},push_up_cluster:{id:`push_up_cluster`,name:`Отжимания (кластер)`,nameEn:`Push-ups (cluster)`,group:`push`,type:`cluster`,difficulty:2,muscles:[`pectoralis`,`anterior_deltoid`,`triceps`],isPrehab:!1,fixedReps:!0},push_up_ladder:{id:`push_up_ladder`,name:`Отжимания (лестница)`,nameEn:`Push-ups (ladder)`,group:`push`,type:`ladder`,difficulty:2,muscles:[`pectoralis`,`anterior_deltoid`,`triceps`],isPrehab:!1,fixedReps:!0},push_up_wide:{id:`push_up_wide`,name:`Отжимания широким хватом`,nameEn:`Wide push-ups`,group:`push`,type:`regular`,difficulty:1,muscles:[`pectoralis`,`anterior_deltoid`],isPrehab:!1,fixedReps:!1},push_up_diamond:{id:`push_up_diamond`,name:`Алмазные отжимания`,nameEn:`Diamond push-ups`,group:`push`,type:`regular`,difficulty:2,muscles:[`triceps`,`anterior_deltoid`,`pectoralis`],isPrehab:!1,fixedReps:!1},push_up_decline:{id:`push_up_decline`,name:`Отжимания ноги сверху`,nameEn:`Decline push-ups`,group:`push`,type:`regular`,difficulty:2,muscles:[`anterior_deltoid`,`upper_pectoralis`,`triceps`],isPrehab:!1,fixedReps:!1},push_up_archer:{id:`push_up_archer`,name:`Отжимания лучника`,nameEn:`Archer push-ups`,group:`push`,type:`regular`,difficulty:3,muscles:[`pectoralis`,`anterior_deltoid`,`triceps`,`core`],isPrehab:!1,fixedReps:!0},face_pull:{id:`face_pull`,name:`Фейс-пулл с эспандером`,nameEn:`Band face pull`,group:`pull`,type:`regular`,difficulty:0,muscles:[`rear_delts`,`rotator_cuff`,`mid_traps`],isPrehab:!0,fixedReps:!0},y_raise:{id:`y_raise`,name:`Y-подъёмы`,nameEn:`Y-raises`,group:`pull`,type:`regular`,difficulty:0,muscles:[`lower_traps`,`rotator_cuff`],isPrehab:!0,fixedReps:!0},external_rotation:{id:`external_rotation`,name:`Внешняя ротация плеча`,nameEn:`Shoulder external rotation`,group:`pull`,type:`regular`,difficulty:0,muscles:[`rotator_cuff`,`infraspinatus`],isPrehab:!0,fixedReps:!0},scapular_pull:{id:`scapular_pull`,name:`Скапулярные подтягивания`,nameEn:`Scapular pull-ups`,group:`pull`,type:`regular`,difficulty:0,muscles:[`lower_traps`,`serratus_anterior`],isPrehab:!0,fixedReps:!0},test_pull:{id:`test_pull`,name:`Тест: макс. подтягивания`,nameEn:`Test: max pull-ups`,group:`pull`,type:`test`,difficulty:0,muscles:[],isPrehab:!1,fixedReps:!0},test_push:{id:`test_push`,name:`Тест: макс. отжимания`,nameEn:`Test: max push-ups`,group:`push`,type:`test`,difficulty:0,muscles:[],isPrehab:!1,fixedReps:!0}},D=`mon`,O=`wed`,k=`fri`;function A(e,t,n,r,i,a,o){let{weight:s,age:c}=n,l=ie(s),u=x(s,`pull`),d=x(s,`push`),f=[],p=r,g=i;for(let n=0;n<3;n++){let r=j(e,n,t,p,g,a,o,s,l,u,d);f.push(r);for(let t=0;t<4;t++)t<3&&(p+=m(p,a,e*12+n*4+t),g+=h(g,o,e*12+n*4+t)),p=Math.min(p,a),g=Math.min(g,o)}return{index:e,emphasis:t,mesocycles:f,startPull:r,endPull:Math.round(p*10)/10,startPush:i,endPush:Math.round(g*10)/10}}function j(e,t,n,r,i,a,o,s,c,l,u){let d=[];for(let f=1;f<=4;f++){let p=f===4,m=ne(f),h=Math.round(l*n.pull*c),g=Math.round(u*n.push*c),_=Math.round(h*m),v=Math.round(g*m),y=M(e,t,f,p,r,i,a,o,_,v,s,n);d.push({week:e*12+t*4+f,weekInMeso:f,isDeload:p,volFactor:m,pullTarget:_,pushTarget:v,sessions:y})}return{index:t,macroIndex:e,weeks:d,emphasis:n}}function M(e,t,n,r,i,a,o,s,c,l,u,d){let f=[];return f.push(ae(i,a,o,s,c,l,r,u,e,t,n)),f.push(oe(i,a,o,s,c,l,r,u,e,t,n)),f.push(se(i,a,o,s,c,l,r,u,e,t,n)),f}function N(e,t,n){return n?e:e+(t-1)}function P(e,t){return t===4?Math.max(1,Math.round(e*b)):e}function ae(e,t,n,r,i,a,o,s,c,l,u){if(o)return F(D,e,t,s);let d=Math.max(3,Math.round(e*.65)),f=Math.max(5,Math.round(t*.55)),p=[];return p.push({...E.pull_up,sets:P(4,u),reps:N(d,u,!1),rest:120,tempo:`20X1`,supersetGroup:`A`,supersetOrder:1}),p.push({...E.push_up,sets:P(4,u),reps:N(f,u,!1),rest:120,tempo:`20X1`,supersetGroup:`A`,supersetOrder:2}),p.push({...E.pull_up_reverse,sets:P(3,u),reps:N(Math.min(6,Math.round(e*.4)),u,!0),rest:90,tempo:`20X1`,supersetGroup:`B`,supersetOrder:1}),p.push({...E.push_up_wide,sets:P(3,u),reps:N(Math.round(f*.9),u,!1),rest:90,tempo:`20X1`,supersetGroup:`B`,supersetOrder:2}),p.push({...E.face_pull,sets:2,reps:15,rest:60,tempo:`2010`}),{day:D,label:`Пн — Силовой (антагонистические суперсеты)`,exercises:p,isDeload:!1}}function oe(e,t,n,r,i,a,o,s,c,l,u){if(o)return F(O,e,t,s);let d=c*12+l*4+u<=8,f=Math.max(2,Math.round(e*.35)),p=Math.max(3,Math.round(t*.3)),m=[];return d?(m.push({...E.pull_up_cluster,sets:4,type:`cluster`,parts:[{reps:f,rest:15},{reps:f,rest:0}],rest:180,tempo:`10X1`,isClusterSuperset:!0,clusterSupersetGroup:`П`}),m.push({...E.push_up_cluster,sets:4,type:`cluster`,parts:[{reps:p,rest:15},{reps:p,rest:0}],rest:180,tempo:`10X1`,isClusterSuperset:!0,clusterSupersetGroup:`П`})):(m.push({...E.pull_up,sets:P(4,u),reps:N(Math.round(e*.55),u,!1),rest:90,tempo:`20X1`,supersetGroup:`A`,supersetOrder:1}),m.push({...E.push_up,sets:P(4,u),reps:N(Math.round(t*.5),u,!1),rest:90,tempo:`20X1`,supersetGroup:`A`,supersetOrder:2})),m.push({...E.y_raise,sets:2,reps:12,rest:60,tempo:`2010`}),m.push({...E.external_rotation,sets:2,reps:12,rest:60,tempo:`2010`}),{day:O,label:d?`Ср — Кластер-суперсеты`:`Ср — Суперсеты`,exercises:m,isDeload:!1}}function se(e,t,n,r,i,a,o,s,c,l,u){if(o)return F(k,e,t,s);let d=[],f=Math.min(5,Math.round(e*.25)),p=Math.min(7,Math.round(t*.2)),m=[],h=[];for(let e=1;e<=f;e++)m.push({reps:e,rest:15});for(let e=1;e<=p;e++)h.push({reps:e,rest:10});d.push({...E.pull_up_ladder,sets:P(3,u),type:`ladder`,parts:m,rest:120,tempo:`20X1`}),d.push({...E.push_up_ladder,sets:P(3,u),type:`ladder`,parts:h,rest:90,tempo:`20X1`});let g=Math.max(2,Math.round(e*.3)),_=Math.max(4,Math.round(t*.25));return d.push({...E.pull_up,sets:5,reps:g,type:`emom`,rest:0,tempo:`20X0`,emomInterval:60,fixedReps:!0}),d.push({...E.push_up,sets:5,reps:_,type:`emom`,rest:0,tempo:`20X0`,emomInterval:60,fixedReps:!0}),d.push({...E.scapular_pull,sets:2,reps:8,rest:60,tempo:`10X1`}),{day:k,label:`Пт — Объём (лестницы + EMOM)`,exercises:d,isDeload:!1}}function F(e,t,n,r){let i=[];return i.push({...E.pull_up,sets:2,reps:Math.max(3,Math.round(t*.5)),rest:120,tempo:`30X1`}),i.push({...E.push_up,sets:2,reps:Math.max(5,Math.round(n*.4)),rest:120,tempo:`30X1`}),i.push({...E.face_pull,sets:2,reps:15,rest:60,tempo:`2010`}),i.push({...E.y_raise,sets:2,reps:12,rest:60,tempo:`2010`}),{day:e,label:{mon:`Пн — Разгрузка`,wed:`Ср — Разгрузка`,fri:`Пт — Разгрузка`}[e]||`Разгрузка`,exercises:i,isDeload:!0}}function ce(e,t){let n=u(e),r=f(e,t),i=c(e.weight,e.age),o=l(e.weight,e.age),s=a(e.age),d=Math.round(i.eli*s),p=Math.round(o.eli*s),m={pullUps:r.pull.capped,pushUps:r.push.capped},h=m.pullUps-e.pullUpMax,g=m.pushUps-e.pushUpMax,_=Math.max(y(e.pullUpMax,m.pullUps,d),y(e.pushUpMax,m.pushUps,p)),v=ee(h,g,_),b=[],x=e.pullUpMax,S=e.pushUpMax;for(let t=0;t<_;t++){let n=A(t,v[t],e,x,S,d,p);b.push(n),x=n.endPull,S=n.endPush}let C=le(b,e),w=te(e,m,{pull:d,push:p});return{profile:e,goals:m,originalGoals:t,eligibility:n,goalValidation:r,ceilings:{pull:d,push:p},macrocycleCount:_,emphases:v,macrocycles:b,validation:C,progression:w,totalWeeks:_*12}}function le(e,t){let n=[],{weight:r}=t,i=x(r,`pull`),a=x(r,`push`),o=0;for(let t of e)for(let e of t.mesocycles)for(let t of e.weeks){let e=w(t.sessions.flatMap(e=>e.exercises||[]));e.pull>i&&!t.isDeload&&n.push({type:`MRV_EXCEEDED`,severity:`high`,week:t.week,exercise:`pull`,volume:e.pull,limit:i,message:`Pull volume ${e.pull} exceeds MRV ${i} on week ${t.week}`}),e.push>a&&!t.isDeload&&n.push({type:`MRV_EXCEEDED`,severity:`high`,week:t.week,exercise:`push`,volume:e.push,limit:a,message:`Push volume ${e.push} exceeds MRV ${a} on week ${t.week}`}),o>0&&!t.isDeload&&o>0&&(re(o,e.pull)||n.push({type:`VOLUME_JUMP`,severity:`medium`,week:t.week,exercise:`pull`,prevVolume:o,newVolume:e.pull,message:`Pull volume jump ${(e.pull/o-1)*100}% on week ${t.week}`}));for(let e of t.sessions){let r=T(e.exercises||[]);r>90&&n.push({type:`SESSION_TOO_LONG`,severity:`high`,week:t.week,day:e.day,duration:r,limit:90,message:`${e.day.toUpperCase()} session ${r}min exceeds 90min cap on week ${t.week}`})}o=t.isDeload?0:e.pull,t.isDeload||e.push}return{passed:n.filter(e=>e.severity===`high`).length===0,issues:n,issueCount:n.length,highSeverityCount:n.filter(e=>e.severity===`high`).length}}function ue(e){let t=[];for(let n of e.macrocycles)for(let e of n.mesocycles)for(let r of e.weeks)for(let i of r.sessions)for(let a of i.exercises||[]){let o=a.type===`cluster`||a.type===`ladder`?(a.parts||[]).reduce((e,t)=>e+t.reps,0)*a.sets:a.sets*a.reps;t.push({macro:n.index+1,meso:e.index+1,week:r.week,weekInMeso:r.weekInMeso,isDeload:r.isDeload,day:i.day,exercise:a.name,exerciseEn:a.nameEn||a.id,group:a.group,type:a.type||`regular`,sets:a.sets,reps:a.reps||(a.parts||[]).map(e=>e.reps).join(`+`),volume:o,rest:a.rest,tempo:a.tempo,isPrehab:a.isPrehab||!1,fixedReps:a.fixedReps||!1,supersetGroup:a.supersetGroup||null,emphasis:n.emphasis.label})}return t}var I=`profile`,L=null,R=0,z=0,B=0,V=0,H={},U={active:!1,remaining:0,interval:null,target:0};function W(){try{localStorage.setItem(`tm_progress`,JSON.stringify(H))}catch{}}function de(){try{let e=localStorage.getItem(`tm_progress`);e&&(H=JSON.parse(e))}catch{}}de();var G=[`mon`,`wed`,`fri`],fe={mon:`Понедельник`,wed:`Среда`,fri:`Пятница`},K={mon:`Пн`,wed:`Ср`,fri:`Пт`},q={beginner:`Начинающий`,novice:`Новичок`,intermediate:`Средний`,advanced:`Продвинутый`,elite:`Элитный`};function pe(){if(!L)return null;let e=L.macrocycles[R];if(!e)return null;let t=e.mesocycles[z];if(!t)return null;let n=t.weeks[B];return n&&n.sessions[V]||null}function J(e){return`m${R}mes${z}w${B}d${V}ex${e}`}function Y(){let e=document.getElementById(`app`);e.innerHTML=`
    <div class="app">
      <div class="app-content">
        ${I===`today`?he():``}
        ${I===`plan`?_e():``}
        ${I===`profile`?be():``}
        ${I===`science`?xe():``}
      </div>
      ${me()}
    </div>
  `,Te(),we()}function me(){return`
    <nav class="tab-bar">
      ${[{id:`today`,icon:`<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,label:`Тренировка`},{id:`plan`,icon:`<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`,label:`План`},{id:`profile`,icon:`<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,label:`Профиль`},{id:`science`,icon:`<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>`,label:`Наука`}].map(e=>`
        <button class="tab-item ${I===e.id?`active`:``}" data-tab="${e.id}">
          ${e.icon}
          <span class="tab-label">${e.label}</span>
        </button>
      `).join(``)}
    </nav>
  `}function he(){if(!L)return`
      <div class="today-empty">
        <div class="today-empty-icon">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
        </div>
        <div class="today-empty-title">Нет активной программы</div>
        <div class="today-empty-hint">Заполните профиль и сгенерируйте программу</div>
        <button class="btn-primary-lg" data-tab="profile">Создать профиль</button>
      </div>
    `;let e=pe();if(!e)return`<div class="today-empty"><div class="today-empty-title">Сессия не найдена</div></div>`;let{macrocycles:t,profile:n,goals:r}=L,i=t[R],a=i.mesocycles[z],o=a.weeks[B],s=i.emphasis,c=`М${R+1} · Мезо ${z+1} · Нед ${B+1}`,l=o.isDeload,u=e.exercises||[],d=0,f=0;return u.forEach((e,t)=>{d+=e.sets,f+=H[J(t)]||0}),`
    <div class="today fade-in">
      <!-- Session Header -->
      <div class="session-top">
        <div class="session-day">${fe[e.day]}</div>
        <div class="session-meta">${c}${l?` · Разгрузка`:``}</div>
        <div class="session-emphasis">${s.label===`pull_focus`?`Акцент: подтягивания`:s.label===`push_focus`?`Акцент: отжимания`:`Баланс`}</div>
      </div>

      <!-- Day Selector Pills -->
      <div class="day-pills">
        ${G.map((e,t)=>{let n=a.weeks[B].sessions[t],r=n&&n.isDeload;return`<button class="pill ${t===V?`pill-active`:``} ${r?`pill-deload`:``}" data-day="${t}">${K[e]}</button>`}).join(``)}
      </div>

      <!-- Week Navigator -->
      <div class="week-nav">
        <button class="nav-arrow" data-week-nav="prev">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg>
        </button>
        <span class="week-nav-label">Неделя ${B+1} / ${a.weeks.length}</span>
        <button class="nav-arrow" data-week-nav="next">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
        </button>
      </div>

      <!-- Progress Bar -->
      <div class="progress-bar-container">
        <div class="progress-bar" style="width: ${d>0?Math.round(f/d*100):0}%"></div>
      </div>
      <div class="progress-label">${f} / ${d} подходов</div>

      <!-- Exercise Cards -->
      <div class="exercise-list">
        ${u.map((e,t)=>ge(e,t,l)).join(``)}
      </div>

      <!-- Rest Timer -->
      <div class="timer-section" id="timer-section">
        <div class="timer-display" id="timer-display">
          <span class="timer-time" id="timer-time">${Q(U.remaining)}</span>
        </div>
        <div class="timer-controls">
          <button class="timer-btn" data-timer="90">1:30</button>
          <button class="timer-btn" data-timer="120">2:00</button>
          <button class="timer-btn" data-timer="180">3:00</button>
          <button class="timer-btn timer-start" data-timer="start">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
          </button>
        </div>
      </div>

      <!-- Export & Reset -->
      <div class="today-actions">
        <button class="btn-secondary" id="export-csv-btn">CSV</button>
        <button class="btn-secondary" id="reset-progress-btn">Сбросить прогресс</button>
      </div>
    </div>
  `}function ge(e,t,n){let r=J(t),i=H[r]||0,a=i>=e.sets,o=``;o=e.type===`cluster`&&e.parts?e.parts.map(e=>e.reps).join(`+`):e.type===`ladder`&&e.parts?e.parts.map(e=>e.reps).join(`→`):e.type===`emom`?`${e.reps} × ${e.sets} р`:e.reps;let s=``;s=e.type===`emom`?`EMOM 60с`:e.type===`cluster`&&e.parts?`${e.parts[0]&&e.parts[0].rest?e.parts[0].rest:15}с / ${e.rest}с`:`${e.rest}с`;let c=``;e.type===`cluster`?c=`<span class="tag tag-green">Кластер</span>`:e.type===`ladder`?c=`<span class="tag tag-blue">Лестница</span>`:e.type===`emom`?c=`<span class="tag tag-orange">EMOM</span>`:e.isPrehab?c=`<span class="tag tag-green">Прехаб</span>`:e.type===`test`&&(c=`<span class="tag tag-red">Тест</span>`);let l=e.group===`pull`?`<span class="tag tag-purple">Подтяг</span>`:`<span class="tag tag-teal">Отжим</span>`,u=``;return e.supersetGroup&&(u=`<span class="tag tag-gray">Суперсет ${e.supersetGroup}</span>`),e.isClusterSuperset&&(u=`<span class="tag tag-green">Кластер-суперсет</span>`),`
    <div class="ex-card ${a?`ex-done`:``} ${n?`ex-deload`:``}" data-ex="${t}">
      <div class="ex-card-top">
        <div class="ex-tags">${c}${l}${u}</div>
        ${a?`<div class="ex-check">&#10003;</div>`:``}
      </div>
      <div class="ex-name">${e.name}</div>
      <div class="ex-numbers">
        <div class="ex-sets-reps">
          <span class="ex-sets">${e.sets}</span>
          <span class="ex-x">×</span>
          <span class="ex-reps">${o}</span>
        </div>
        <div class="ex-details">
          <span class="ex-detail">Темп ${e.tempo||`—`}</span>
          <span class="ex-detail">Отдых ${s}</span>
        </div>
      </div>
      <!-- Set Circles -->
      <div class="ex-sets-track">
        ${Array.from({length:e.sets},(t,n)=>`
          <button class="set-circle ${n<i?`set-done`:``}" data-set="${n}" data-ex-key="${r}" data-rest="${e.rest}">
            ${n<i?`&#10003;`:n+1}
          </button>
        `).join(``)}
      </div>
    </div>
  `}function _e(){if(!L)return`
      <div class="today-empty">
        <div class="today-empty-title">Программа не создана</div>
        <button class="btn-primary-lg" data-tab="profile">Создать профиль</button>
      </div>
    `;let{macrocycles:e,profile:t,goals:n,originalGoals:r,eligibility:i,goalValidation:a,ceilings:o,macrocycleCount:s,emphases:c,totalWeeks:l,progression:u,validation:d}=L;return`
    <div class="plan fade-in">
      <div class="plan-header">
        <div class="plan-title">Программа</div>
        <div class="plan-subtitle">${t.weight} кг · ${t.age} лет · ${n.pullUps} / ${n.pushUps}</div>
      </div>

      <!-- Eligibility -->
      ${X(i)}
      ${Se(a,r)}

      <!-- Key Stats -->
      <div class="stats-row">
        <div class="stat-item">
          <div class="stat-num">${s}</div>
          <div class="stat-lbl">Макроциклов</div>
        </div>
        <div class="stat-item">
          <div class="stat-num">${l}</div>
          <div class="stat-lbl">Недель</div>
        </div>
        <div class="stat-item">
          <div class="stat-num">${o.pull}</div>
          <div class="stat-lbl">Макс подтяг</div>
        </div>
        <div class="stat-item">
          <div class="stat-num">${o.push}</div>
          <div class="stat-lbl">Макс отжим</div>
        </div>
      </div>

      <!-- Emphasis -->
      <div class="plan-section">
        <div class="plan-section-title">Акценты по макроциклам</div>
        <div class="emphasis-list">
          ${c.map((e,t)=>`
            <div class="emphasis-item">
              <span class="emphasis-num">М${t+1}</span>
              <span class="emphasis-label">${e.label===`pull_focus`?`Подтягивания`:e.label===`push_focus`?`Отжимания`:`Баланс`}</span>
              <span class="emphasis-ratio">${Math.round(e.pull*100/(e.pull+e.push))}%/${Math.round(e.push*100/(e.pull+e.push))}%</span>
            </div>
          `).join(``)}
        </div>
      </div>

      <!-- Progression Chart -->
      <div class="plan-section">
        <div class="plan-section-title">Прогрессия</div>
        <div class="chart-container">
          ${Ce(u,n,o)}
        </div>
      </div>

      <!-- Macrocycle Accordion -->
      <div class="plan-section">
        <div class="plan-section-title">Макроциклы</div>
        ${e.map((e,t)=>ve(e,t)).join(``)}
      </div>

      <!-- Validation -->
      <div class="plan-section">
        <div class="plan-section-title">Валидация</div>
        ${Z(d)}
      </div>

      <div class="plan-actions">
        <button class="btn-secondary" id="export-csv-btn">Экспорт CSV</button>
      </div>
    </div>
  `}function ve(e,t){let n=t===R;return`
    <div class="macro-accordion">
      <button class="macro-header ${n?`open`:``}" data-macro-toggle="${t}">
        <span class="macro-label">Макроцикл ${t+1}</span>
        <span class="macro-emphasis">${e.emphasis.label===`pull_focus`?`Подтяг`:e.emphasis.label===`push_focus`?`Отжим`:`Баланс`}</span>
        <svg class="macro-chevron ${n?`rotated`:``}" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
      </button>
      ${n?ye(e,t):``}
    </div>
  `}function ye(e,t){return`
    <div class="meso-list">
      ${e.mesocycles.map((e,n)=>`
        <div class="meso-item">
          <div class="meso-label">Мезоцикл ${n+1}</div>
          ${e.weeks.map((e,r)=>`
            <div class="week-row ${e.isDeload?`week-deload`:``}">
              <span class="week-label">Нед ${r+1}${e.isDeload?` (разгрузка)`:``}</span>
              <div class="week-days">
                ${G.map((i,a)=>{let o=e.sessions[a],s=o?(o.exercises||[]).length:0;return`<button class="day-btn" data-goto="m${t}me${n}w${r}d${a}">${K[i]}<span class="day-ex-count">${s}</span></button>`}).join(``)}
              </div>
            </div>
          `).join(``)}
        </div>
      `).join(``)}
    </div>
  `}function be(){return`
    <div class="profile fade-in">
      <div class="profile-title">Профиль атлета</div>

      <div class="form-section">
        <div class="form-row">
          <div class="field">
            <label class="field-label">Вес (кг)</label>
            <input type="number" class="field-input" id="weight" placeholder="100" min="40" max="150" value="100" inputmode="numeric">
          </div>
          <div class="field">
            <label class="field-label">Возраст</label>
            <input type="number" class="field-input" id="age" placeholder="30" min="15" max="65" value="30" inputmode="numeric">
          </div>
        </div>
        <div class="form-row">
          <div class="field">
            <label class="field-label">Пол</label>
            <select class="field-input" id="sex">
              <option value="male">Мужской</option>
              <option value="female">Женский</option>
            </select>
          </div>
        </div>
        <div class="form-divider"></div>
        <div class="form-row">
          <div class="field">
            <label class="field-label">Макс. подтягивания</label>
            <input type="number" class="field-input" id="pullUpMax" placeholder="20" min="0" max="60" value="20" inputmode="numeric">
          </div>
          <div class="field">
            <label class="field-label">Макс. отжимания</label>
            <input type="number" class="field-input" id="pushUpMax" placeholder="50" min="0" max="200" value="50" inputmode="numeric">
          </div>
        </div>
        <div class="form-divider"></div>
        <div class="form-row">
          <div class="field">
            <label class="field-label">Цель: подтягивания</label>
            <input type="number" class="field-input" id="goalPull" placeholder="28" min="0" max="60" value="28" inputmode="numeric">
          </div>
          <div class="field">
            <label class="field-label">Цель: отжимания</label>
            <input type="number" class="field-input" id="goalPush" placeholder="81" min="0" max="200" value="81" inputmode="numeric">
          </div>
        </div>
      </div>

      <button class="btn-primary-lg" id="generate-btn">Сгенерировать программу</button>

      <div id="eligibility-result"></div>
    </div>
  `}function xe(){return`
    <div class="science fade-in">
      <div class="science-title">Научная база</div>

      <div class="science-section">
        <div class="science-section-title">Нормативы: подтягивания</div>
        <div class="norms-table-wrap">
          <table class="norms-table">
            <thead><tr><th>Вес</th><th>Нов</th><th>Сред</th><th>Прод</th><th>Элит</th></tr></thead>
            <tbody>
              ${[70,80,90,100,110,120].map(e=>{let t=c(e,30);return`<tr><td>${e}</td><td>${t.nov}</td><td>${t.int}</td><td>${t.adv}</td><td>${t.eli}</td></tr>`}).join(``)}
            </tbody>
          </table>
        </div>
        <div class="norms-source">Муж., 30 лет. Strength Level (4.8M lifts)</div>
      </div>

      <div class="science-section">
        <div class="science-section-title">Нормативы: отжимания</div>
        <div class="norms-table-wrap">
          <table class="norms-table">
            <thead><tr><th>Вес</th><th>Нов</th><th>Сред</th><th>Прод</th><th>Элит</th></tr></thead>
            <tbody>
              ${[70,80,90,100,110,120].map(e=>{let t=l(e,30);return`<tr><td>${e}</td><td>${t.nov}</td><td>${t.int}</td><td>${t.adv}</td><td>${t.eli}</td></tr>`}).join(``)}
            </tbody>
          </table>
        </div>
        <div class="norms-source">Муж., 30 лет. Strength Level (2.9M lifts)</div>
      </div>

      <div class="science-section">
        <div class="science-section-title">Факторы возраста</div>
        <div class="age-factors">
          <div class="age-row"><span>20–40</span><span>1.00</span></div>
          <div class="age-row"><span>41–45</span><span>0.85</span></div>
          <div class="age-row"><span>46–50</span><span>0.65</span></div>
          <div class="age-row"><span>51–55</span><span>0.50</span></div>
          <div class="age-row"><span>56–60</span><span>0.30</span></div>
        </div>
        <div class="norms-source">Kjaer et al. (2016)</div>
      </div>

      <div class="science-section">
        <div class="science-section-title">Потолок целей</div>
        <div class="science-text">Потолок — 95-й перцентиль (Elite). По данным Strength Level (4.8M + 2.9M lifts), лишь 5% спортсменов данного веса достигают этого результата. Цели выше потолка ограничены 95% его значения.</div>
        <div class="science-text"><strong>Почему 100 отжиманий при 100 кг нереалистичны?</strong> Элитный результат для 100 кг — 81 отжимание (Strength Level, 2.9M lifts). 100 отжиманий = 123-й перцентиль. 100 отжиманий реально при ~60–65 кг (элитный: 95–102).</div>
        <div class="science-text"><strong>Schoenfeld et al. (2023)</strong>: мышечная адаптация имеет логарифмическую кривую. Ближе к потолку прогресс резко замедляется. 95% — граница, за которой нет доказательной базы.</div>
      </div>

      <div class="science-section">
        <div class="science-section-title">Исследования</div>
        <div class="refs-list">
          <div class="ref-item"><strong>Vanderburgh (2006, 2007)</strong> — Allometric scaling: 1RM ~ M<sup>2/3</sup></div>
          <div class="ref-item"><strong>Sanchez-Moreno et al. (2016)</strong> — Pull-ups: r = −0.55 with body mass</div>
          <div class="ref-item"><strong>Yu et al. (2021)</strong> — Cluster sets: SMD=0.24 (wks 1-8), SMD=−1.54 (after wk 8)</div>
          <div class="ref-item"><strong>Schoenfeld et al. (2023)</strong> — Finite muscular adaptation, logarithmic curve</div>
          <div class="ref-item"><strong>Rhea et al.; Barsuhn et al. (2024)</strong> — ~1/3 peak volume maintains qualities</div>
          <div class="ref-item"><strong>Kjaer et al. (2016)</strong> — Age × MSMF: Beta = −0.15 to −0.91/year</div>
          <div class="ref-item"><strong>Strength Level</strong> — Normative data: 4.8M + 2.9M lifts</div>
        </div>
      </div>
    </div>
  `}function X(e){return e.eligible?`
      <div class="badge-success">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
        <span>Допуск получен</span>
        <span class="badge-detail">Подтяг: ${e.pull.max} (${q[e.pull.level]}) · Отжим: ${e.push.max} (${q[e.push.level]})</span>
      </div>
    `:`
    <div class="badge-error">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      <span>Недостаточный уровень</span>
      <span class="badge-detail">Порог: подтяг ≥${e.pull.threshold}, отжим ≥${e.push.threshold}</span>
    </div>
  `}function Se(e,t){let n=[];return e.pull.warning===`approaching_ceiling`&&n.push(`Подтяг: цель близка к потолку (${Math.round(e.pull.ratio*100)}%)`),e.pull.warning===`capped_at_95pct_ceiling`&&n.push(`Подтяг: ${t.pullUps} → ограничено до ${e.pull.capped}`),e.push.warning===`approaching_ceiling`&&n.push(`Отжим: цель близка к потолку (${Math.round(e.push.ratio*100)}%)`),e.push.warning===`capped_at_95pct_ceiling`&&n.push(`Отжим: ${t.pushUps} → ограничено до ${e.push.capped}`),n.length===0?``:`<div class="badge-warning">${n.map(e=>`<span>${e}</span>`).join(``)}</div>`}function Z(e){return e.passed?`<div class="badge-success"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg><span>Валидация пройдена</span></div>`:`<div class="badge-error"><span>${e.issues.filter(e=>e.severity===`high`).length} крит., ${e.issues.filter(e=>e.severity===`medium`).length} средних</span></div>`}function Ce(e,t,n){if(!e||e.length===0)return`<div class="chart-empty">Нет данных прогрессии</div>`;let r=e.length,i=Math.max(n.pull,n.push,...e.map(e=>Math.max(e.pull,e.push))),a=260/Math.max(r-1,1),o=80/i,s=e.map((e,t)=>`${30+t*a},${110-e.pull*o}`).join(` `),c=e.map((e,t)=>`${30+t*a},${110-e.push*o}`).join(` `),l=110-n.pull*o,u=110-n.push*o;return`
    <svg class="chart-svg" viewBox="0 0 320 140" preserveAspectRatio="xMidYMid meet">
      <!-- Ceiling lines -->
      <line x1="30" y1="${l}" x2="290" y2="${l}" stroke="var(--accent)" stroke-width="1" stroke-dasharray="4 3" opacity="0.5"/>
      <line x1="30" y1="${u}" x2="290" y2="${u}" stroke="var(--teal)" stroke-width="1" stroke-dasharray="4 3" opacity="0.5"/>
      <!-- Ceiling labels -->
      <text x="293" y="${l+4}" fill="var(--accent)" font-size="9" font-family="var(--font-mono)">${n.pull}</text>
      <text x="293" y="${u+4}" fill="var(--teal)" font-size="9" font-family="var(--font-mono)">${n.push}</text>
      <!-- Pull line -->
      <polyline points="${s}" fill="none" stroke="var(--accent)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <!-- Push line -->
      <polyline points="${c}" fill="none" stroke="var(--teal)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <!-- Axes -->
      <line x1="30" y1="30" x2="30" y2="110" stroke="var(--border)" stroke-width="1"/>
      <line x1="30" y1="110" x2="290" y2="110" stroke="var(--border)" stroke-width="1"/>
      <!-- Legend -->
      <circle cx="40" cy="40" r="4" fill="var(--accent)"/>
      <text x="48" y="43" fill="var(--fg-secondary)" font-size="9">Подтяг</text>
      <circle cx="100" cy="40" r="4" fill="var(--teal)"/>
      <text x="108" y="43" fill="var(--fg-secondary)" font-size="9">Отжим</text>
    </svg>
  `}function Q(e){let t=Math.floor(Math.max(0,e)/60),n=Math.max(0,e)%60;return`${t}:${String(n).padStart(2,`0`)}`}function $(e){clearInterval(U.interval),U.active=!0,U.remaining=e,U.target=e,U.interval=setInterval(()=>{U.remaining--;let e=document.getElementById(`timer-time`);if(e&&(e.textContent=Q(U.remaining)),U.remaining<=0){clearInterval(U.interval),U.active=!1;let e=document.getElementById(`timer-time`);e&&(e.textContent=`0:00`),navigator.vibrate&&navigator.vibrate([200,100,200])}},1e3);let t=document.getElementById(`timer-time`);t&&(t.textContent=Q(U.remaining))}function we(){if(U.active){let e=document.getElementById(`timer-time`);e&&(e.textContent=Q(U.remaining))}}function Te(){document.querySelectorAll(`[data-tab]`).forEach(e=>{e.addEventListener(`click`,()=>{I=e.dataset.tab,Y()})});let e=document.getElementById(`generate-btn`);e&&e.addEventListener(`click`,Ee),document.querySelectorAll(`[data-day]`).forEach(e=>{e.addEventListener(`click`,()=>{V=parseInt(e.dataset.day),Y()})}),document.querySelectorAll(`[data-week-nav]`).forEach(e=>{e.addEventListener(`click`,()=>{let t=L.macrocycles[R].mesocycles[z];e.dataset.weekNav===`prev`&&B>0&&B--,e.dataset.weekNav===`next`&&B<t.weeks.length-1&&B++,Y()})}),document.querySelectorAll(`.set-circle`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.dataset.exKey,n=parseInt(e.dataset.set),r=parseInt(e.dataset.rest)||90,i=H[t]||0;n<i?H[t]=n:n===i&&(H[t]=n+1,$(r)),W(),Y()})}),document.querySelectorAll(`[data-timer]`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.dataset.timer;$(t===`start`?U.target||90:parseInt(t))})}),document.querySelectorAll(`[data-macro-toggle]`).forEach(e=>{e.addEventListener(`click`,()=>{R=parseInt(e.dataset.macroToggle),z=0,B=0,Y()})}),document.querySelectorAll(`[data-goto]`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.dataset.goto.match(/m(\d+)me(\d+)w(\d+)d(\d+)/);t&&(R=parseInt(t[1]),z=parseInt(t[2]),B=parseInt(t[3]),V=parseInt(t[4]),I=`today`,Y())})});let t=document.getElementById(`export-csv-btn`);t&&t.addEventListener(`click`,De);let n=document.getElementById(`reset-progress-btn`);n&&n.addEventListener(`click`,()=>{H={},W(),Y()})}function Ee(){let e=parseInt(document.getElementById(`weight`).value)||100,t=parseInt(document.getElementById(`age`).value)||30,n=document.getElementById(`sex`).value||`male`,r=parseInt(document.getElementById(`pullUpMax`).value)||0,i=parseInt(document.getElementById(`pushUpMax`).value)||0,a=parseInt(document.getElementById(`goalPull`).value)||0,o=parseInt(document.getElementById(`goalPush`).value)||0,s={weight:e,age:t,sex:n,pullUpMax:r,pushUpMax:i},c={pullUps:a,pushUps:o},l=u(s),d=document.getElementById(`eligibility-result`);if(!l.eligible){d.innerHTML=X(l),L=null;return}try{L=ce(s,c),H={},W(),R=0,z=0,B=0,V=0,I=`today`,Y()}catch(e){d.innerHTML=`<div class="badge-error"><span>Ошибка: ${e.message}</span></div>`}}function De(){if(!L)return;let e=ue(L),t=[`macro`,`meso`,`week`,`weekInMeso`,`isDeload`,`day`,`exercise`,`exerciseEn`,`group`,`type`,`sets`,`reps`,`volume`,`rest`,`tempo`,`isPrehab`,`fixedReps`,`supersetGroup`,`emphasis`],n=[t.join(`,`),...e.map(e=>t.map(t=>{let n=e[t];return typeof n==`string`&&n.includes(`,`)?`"`+n+`"`:n}).join(`,`))].join(`
`),r=new Blob([`﻿`+n],{type:`text/csv;charset=utf-8;`}),i=URL.createObjectURL(r),a=document.createElement(`a`);a.href=i,a.download=`training-matrix-`+L.profile.weight+`kg.csv`,a.click(),URL.revokeObjectURL(i)}Y();