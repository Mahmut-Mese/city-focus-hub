(function(o,G,ue,A,xe){"use strict";function ha(a){return a&&a.__esModule?a:{default:a}}var e=ha(o);const Ee=[{table:"blog_posts",label:"Blog Posts",sidebarLabel:"Blog Post",navigation:"Collections",sidebarSection:"collections",sidebarHref:"/admin/pages/blog-posts"},{table:"faq_items",label:"FAQ Items",sidebarLabel:"FAQ Item",navigation:"Collections",sidebarSection:"collections",sidebarHref:"/admin/pages/faq-items"},{table:"meeting_rooms",label:"Meeting Rooms",sidebarLabel:"Meeting Room",navigation:"Collections",sidebarSection:"collections",sidebarHref:"/admin/pages/meeting-rooms"},{table:"pricing_plans",label:"Pricing Plans",sidebarLabel:"Pricing Plan",navigation:"Collections",sidebarSection:"collections",sidebarHref:"/admin/pages/pricing-plans"},{table:"files",label:"Media Library",sidebarLabel:"Media Library",navigation:"Media",sidebarSection:null},{table:"member_users",label:"Customers",sidebarLabel:"Customers",navigation:"Operations",sidebarSection:"customers",sidebarHref:"/admin/pages/customers",hiddenColumns:["password_hash"],listProperties:["id","name","email","access_status","created_at"],filterProperties:["id","name","email","access_status"],readOnly:!0},{table:"memberships",label:"Memberships",sidebarLabel:"Memberships",navigation:"Operations",sidebarSection:null,listProperties:["id","user_id","plan_id","status","stripe_subscription_id","updated_at"],filterProperties:["id","user_id","plan_id","status","stripe_subscription_id"],readOnly:!0},{table:"membership_plans",label:"Membership Plans",sidebarLabel:"Membership Plans",navigation:"Operations",sidebarSection:null,listProperties:["id","name","slug","monthly_price_minor","currency","active","updated_at"],filterProperties:["id","name","slug","currency","active"],readOnly:!0},{table:"bookings",label:"Orders",sidebarLabel:"Orders",navigation:"Operations",sidebarSection:"orders",sidebarHref:"/admin/pages/orders",listProperties:["id","user_id","resource_id","status","refund_request_status","start_at","total_minor","updated_at"],filterProperties:["id","user_id","resource_id","status","refund_request_status","start_at","stripe_payment_status"],readOnly:!0},{table:"resources",label:"Bookable Resources",sidebarLabel:"Bookable Resources",navigation:"Operations",sidebarSection:null,listProperties:["id","name","slug","type","hourly_rate_minor","active","updated_at"],filterProperties:["id","name","slug","type","active"],readOnly:!0},{table:"invoices",label:"Invoices",sidebarLabel:"Invoices",navigation:"Operations",sidebarSection:"orders",sidebarHref:"/admin/pages/invoices",listProperties:["id","user_id","membership_id","booking_id","status","total_minor","paid_at"],filterProperties:["id","user_id","membership_id","booking_id","status","stripe_invoice_id"],readOnly:!0},{table:"contact_submissions",label:"Messages",sidebarLabel:"Messages",navigation:"Operations",sidebarSection:"customers",sidebarHref:"/admin/pages/messages",listProperties:["id","name","email","source_page","created_at"],filterProperties:["id","name","email","source_page"],readOnly:!0}];function we(a){return`/admin/resources/${a}/actions/list`}const _a=[{label:"Homepage",href:"/admin/pages/homepage"},{label:"About Page",href:"/admin/pages/about-page"},{label:"Pricing Page",href:"/admin/pages/pricing-page"},{label:"Contact Page",href:"/admin/pages/contact-page"}],ya=[{label:"Blog Posts",href:"/admin/pages/blog-posts"},{label:"FAQ Items",href:"/admin/pages/faq-items"},{label:"Meeting Rooms",href:"/admin/pages/meeting-rooms"},{label:"Pricing Plans",href:"/admin/pages/pricing-plans"}],xa=["member_users","contact_submissions"],Ea=["bookings","invoices"],wa=xa.map(a=>Ee.find(t=>t.table===a)).filter(Boolean).map(a=>({label:a.sidebarLabel||a.label,href:a.sidebarHref||we(a.table)})),Na=Ea.map(a=>Ee.find(t=>t.table===a)).filter(Boolean).map(a=>({label:a.sidebarLabel||a.label,href:a.sidebarHref||we(a.table)})),va=`
.admin-dashboard {
  min-height: 100%;
  padding: 32px 40px 64px 40px;
  background: #f6f6f9;
  color: #32324d;
}

.admin-dashboard__inner {
  max-width: 1240px;
  margin: 0 auto;
}

.admin-dashboard__eyebrow {
  margin: 0 0 4px;
  color: #666687;
  font-size: 0.75rem;
  line-height: 1rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.03em;
}

.admin-dashboard__title {
  margin: 0;
  font-size: 2.25rem;
  line-height: 2.75rem;
  font-weight: 700;
}

.admin-dashboard__subtitle {
  margin: 10px 0 28px;
  max-width: 780px;
  color: #666687;
  font-size: 1rem;
  line-height: 1.5rem;
}

.admin-dashboard__grid {
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr);
  gap: 16px;
}

.admin-dashboard__card {
  border: 1px solid #dcdce4;
  border-radius: 4px;
  background: #ffffff;
  box-shadow: 0 1px 2px rgba(33, 33, 52, 0.06);
}

.admin-dashboard__card-head {
  padding: 16px 20px 12px;
  border-bottom: 1px solid #f0f0f5;
}

.admin-dashboard__card-title {
  margin: 0;
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: 700;
  color: #32324d;
}

.admin-dashboard__card-body {
  padding: 8px;
}

.admin-dashboard__list {
  display: flex;
  flex-direction: column;
}

.admin-dashboard__item {
  width: 100%;
  border: 0;
  background: transparent;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 12px;
  cursor: pointer;
  text-align: left;
}

.admin-dashboard__item:hover {
  background: #f6f6f9;
}

.admin-dashboard__item-copy {
  min-width: 0;
}

.admin-dashboard__item-label {
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: 600;
  color: #32324d;
}

.admin-dashboard__item-meta {
  margin-top: 2px;
  font-size: 0.75rem;
  line-height: 1rem;
  color: #666687;
}

.admin-dashboard__item-arrow {
  color: #8e8ea9;
  font-size: 1rem;
}

.admin-dashboard__notice {
  padding: 20px;
}

.admin-dashboard__notice-title {
  margin: 0 0 8px;
  font-size: 1rem;
  line-height: 1.5rem;
  font-weight: 700;
}

.admin-dashboard__notice-copy {
  margin: 0;
  color: #666687;
  font-size: 0.875rem;
  line-height: 1.5rem;
}

.admin-dashboard__messages {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.admin-dashboard__message {
  border: 1px solid #f0f0f5;
  border-radius: 4px;
  padding: 14px 16px;
}

.admin-dashboard__message-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
}

.admin-dashboard__message-name {
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: 700;
  color: #32324d;
}

.admin-dashboard__message-email,
.admin-dashboard__message-meta {
  font-size: 0.75rem;
  line-height: 1rem;
  color: #666687;
}

.admin-dashboard__message-body {
  margin: 10px 0 0;
  color: #32324d;
  font-size: 0.875rem;
  line-height: 1.5rem;
  white-space: pre-wrap;
}

.admin-dashboard__message-actions {
  margin-top: 12px;
  display: flex;
  gap: 8px;
}

.admin-dashboard__button {
  appearance: none;
  border: 1px solid #d9d8e6;
  border-radius: 4px;
  padding: 6px 10px;
  font-size: 0.75rem;
  line-height: 1rem;
  color: #32324d;
  background: #fff;
  cursor: pointer;
}

.admin-dashboard__button:hover {
  background: #f6f6f9;
}

.admin-dashboard__button--danger {
  border-color: #ffd3c7;
  color: #c72e3a;
}

.admin-dashboard__button--danger:hover {
  background: #fff5f2;
}

.admin-dashboard__button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.admin-dashboard__detail {
  border-top: 1px solid #f0f0f5;
  margin-top: 10px;
  padding-top: 12px;
}

.admin-dashboard__detail-heading {
  margin: 0;
  font-size: 0.8125rem;
  line-height: 1.125rem;
  font-weight: 700;
  color: #32324d;
}

.admin-dashboard__detail-body {
  margin: 10px 0 0;
  color: #32324d;
  font-size: 0.8125rem;
  line-height: 1.5rem;
  white-space: pre-wrap;
}

.admin-dashboard__detail-actions {
  margin-top: 10px;
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}

.admin-dashboard__error {
  color: #c72e3a;
  margin: 10px 0 0;
  font-size: 0.75rem;
  line-height: 1rem;
}

.admin-dashboard__empty {
  padding: 20px;
  color: #666687;
  font-size: 0.875rem;
  line-height: 1.5rem;
}

@media (max-width: 960px) {
  .admin-dashboard {
    padding: 20px 16px 48px;
  }

  .admin-dashboard__grid {
    grid-template-columns: 1fr;
  }
}
`,ka=new ue.ApiClient;function Oe(a){if(!a)return"";const t=new Date(a);return Number.isNaN(t.getTime())?"":new Intl.DateTimeFormat("en-GB",{dateStyle:"medium",timeStyle:"short"}).format(t)}function Sa(a){const t=String(a??"").trim();return t.length<=180?t:`${t.slice(0,177).trimEnd()}...`}function Ca(a){if(!a)return null;try{return JSON.parse(a)}catch{return null}}async function te(a,t={}){const n=await fetch(a,{credentials:"same-origin",...t,headers:{"Content-Type":"application/json",...t.headers||{}}}),r=await n.text(),i=Ca(r);if(!n.ok){const d=i?.error||i?.message||r||`Request failed (${n.status}).`;throw new Error(d)}return i}function Aa(a){return Array.isArray(a?.data)?a.data:[]}function Ne(a){const t=a??{};return{id:Number(t.id),name:String(t.name??""),email:String(t.email??""),phone:String(t.phone??""),message:String(t.message??""),sourcePage:String(t.sourcePage??t.source_page??""),createdAt:t.createdAt??t.created_at??null}}function Pa(a){return Array.isArray(a?.records)?a.records.map(t=>Ne(t?.params??{})).filter(t=>Number.isFinite(t.id)):[]}function Da(a){return a?.record?.params?Ne(a.record.params):null}function je(a){return Array.isArray(a?.recentSubmissions)?a.recentSubmissions:Array.isArray(a?.data?.recentSubmissions)?a.data.recentSubmissions:Array.isArray(a?.recentMessages)?a.recentMessages:[]}function Ta(a){return Array.isArray(a?.recentSubmissions)?a.recentSubmissions:Array.isArray(a?.data?.recentSubmissions)?a.data.recentSubmissions:Array.isArray(a?.payload?.recentSubmissions)?a.payload.recentSubmissions:Array.isArray(a?.body?.recentSubmissions)?a.body.recentSubmissions:Array.isArray(a?.result?.recentSubmissions)?a.result.recentSubmissions:Array.isArray(a?.recentMessages)?a.recentMessages:Array.isArray(a?.data?.recentMessages)?a.data.recentMessages:Array.isArray(a?.data?.items)?a.data.items:[]}function ve(a){const t=a?.data??a;return Ta(t)}async function Ue(){const a=await fetch("/admin/api/dashboard",{credentials:"same-origin"}),t=await a.text();if(!a.ok||!t)throw new Error(`Unable to load dashboard messages (${a.status}).`);try{return JSON.parse(t)}catch{throw new Error("Dashboard API returned a non-JSON response.")}}async function Ia(a=50){const t=Number.isFinite(Number(a))?Number(a):50,n=i=>Aa(i);try{const i=await te(`/admin/api/contact-submissions?limit=${t}`),d=n(i);if(d.length)return d}catch(i){console.warn("Custom contact submissions endpoint unavailable:",i?.message||i)}const r=await te(`/admin/api/resources/contact_submissions/actions/list?page=1&perPage=${t}`);return Pa(r)}async function La(a){const t=Number(a);if(!Number.isFinite(t)||t<=0)throw new Error("Invalid submission id.");try{const r=await te(`/admin/api/contact-submissions/${t}`,{method:"DELETE"});if(r?.ok)return;if(r?.error)throw new Error(r.error)}catch{}const n=await te(`/admin/api/resources/contact_submissions/records/${t}/delete`,{method:"POST",headers:{Accept:"application/json"}});if(n?.record?.baseError){const r=n.record.baseError?.message||"Unable to delete submission.";throw new Error(r)}if(n?.notice?.type==="error")throw new Error(n.notice?.message||"Unable to delete submission.")}async function Fa(a){const t=Number(a);if(!Number.isFinite(t)||t<=0)return null;try{const r=await te(`/admin/api/contact-submissions/${t}`),i=Ne(r?.data?.record??r?.record??r);if(i.id>0)return i}catch(r){console.warn("Unable to load message from custom endpoint:",r?.message||r)}const n=await te(`/admin/api/resources/contact_submissions/records/${t}/show`);return Da(n)}function fe({title:a,items:t,navigate:n,meta:r}){return e.default.createElement("section",{className:"admin-dashboard__card"},e.default.createElement("div",{className:"admin-dashboard__card-head"},e.default.createElement("h2",{className:"admin-dashboard__card-title"},a)),e.default.createElement("div",{className:"admin-dashboard__card-body"},e.default.createElement("div",{className:"admin-dashboard__list"},t.map(i=>e.default.createElement("button",{key:i.href,className:"admin-dashboard__item",type:"button",onClick:()=>n(i.href)},e.default.createElement("div",{className:"admin-dashboard__item-copy"},e.default.createElement("div",{className:"admin-dashboard__item-label"},i.label),e.default.createElement("div",{className:"admin-dashboard__item-meta"},r)),e.default.createElement("span",{className:"admin-dashboard__item-arrow"},"\u2192"))))))}function za({submissions:a,selectedSubmission:t,onOpen:n,onDelete:r,deletingId:i,operationError:d}){return e.default.createElement("section",{className:"admin-dashboard__card"},e.default.createElement("div",{className:"admin-dashboard__card-head"},e.default.createElement("h2",{className:"admin-dashboard__card-title"},"Customer Messages")),e.default.createElement("div",{className:"admin-dashboard__card-body"},a.length?e.default.createElement("div",{className:"admin-dashboard__messages"},a.map(u=>e.default.createElement("article",{key:u.id,className:"admin-dashboard__message"},e.default.createElement("div",{className:"admin-dashboard__message-head"},e.default.createElement("div",null,e.default.createElement("div",{className:"admin-dashboard__message-name"},u.name),e.default.createElement("div",{className:"admin-dashboard__message-email"},u.email),u.phone?e.default.createElement("div",{className:"admin-dashboard__message-meta"},u.phone):null),e.default.createElement("div",{className:"admin-dashboard__message-meta"},u.sourcePage,Oe(u.createdAt)?` \xB7 ${Oe(u.createdAt)}`:"")),e.default.createElement("p",{className:"admin-dashboard__message-body"},Sa(u.message)),e.default.createElement("div",{className:"admin-dashboard__message-actions"},e.default.createElement("button",{type:"button",className:"admin-dashboard__button",onClick:()=>n(u)},"Open"),e.default.createElement("button",{type:"button",className:"admin-dashboard__button admin-dashboard__button--danger",onClick:()=>r(u),disabled:i===u.id},i===u.id?"Deleting\u2026":"Delete")))),t?e.default.createElement("div",{className:"admin-dashboard__detail"},e.default.createElement("h3",{className:"admin-dashboard__detail-heading"},"Selected message"),e.default.createElement("p",{className:"admin-dashboard__detail-body"},t.message),e.default.createElement("div",{className:"admin-dashboard__detail-actions"},e.default.createElement("button",{type:"button",className:"admin-dashboard__button",onClick:()=>n(null)},"Close"),e.default.createElement("button",{type:"button",className:"admin-dashboard__button admin-dashboard__button--danger",onClick:()=>r(t),disabled:i===t.id},i===t.id?"Deleting\u2026":"Delete"))):null):e.default.createElement("div",{className:"admin-dashboard__empty"},"No customer messages yet."),d?e.default.createElement("div",{className:"admin-dashboard__error"},d):null))}function $a(a){const t=G.useNavigate(),[n,r]=o.useState(je(a)),[i,d]=o.useState(null),[u,s]=o.useState(null),[f,b]=o.useState("");o.useEffect(()=>{const h=je(a);h.length&&r(h)},[a]),o.useEffect(()=>{let h=!0;return(async()=>{const _=m=>{!h||!Array.isArray(m)||r(m)};try{const m=await ka.getDashboard(),l=ve(m);if(l.length){_(l);return}const y=await Ia();if(y.length){_(y);return}const w=await Ue(),p=ve(w);_(p)}catch(m){if(!h)return;try{const l=await Ue(),y=ve(l);_(y);return}catch(l){console.warn("Unable to load dashboard messages:",m?.message||m),l&&console.warn("Dashboard fallback also failed:",l?.message||l)}}})(),()=>{h=!1}},[]);const g=n,E=async h=>{if(b(""),d(h),!!h?.id)try{const x=await Fa(h.id);x&&d(x)}catch(x){b(x?.message||"Unable to open selected message.")}},S=async h=>{if(!h?.id)return;const x=Number(h.id);if(!(!Number.isFinite(x)||x<=0)){s(x),b("");try{await La(x),r(_=>_.filter(m=>m.id!==x)),d(_=>_?.id===x?null:_)}catch(_){b(_?.message||"Unable to delete submission.")}finally{s(null)}}};return e.default.createElement(e.default.Fragment,null,e.default.createElement("style",null,va),e.default.createElement("div",{className:"admin-dashboard"},e.default.createElement("div",{className:"admin-dashboard__inner"},e.default.createElement("p",{className:"admin-dashboard__eyebrow"},"Home"),e.default.createElement("h1",{className:"admin-dashboard__title"},"Content Manager"),e.default.createElement("p",{className:"admin-dashboard__subtitle"},"Use the shortcuts below to jump into site content, customers, orders, billing, and incoming messages."),e.default.createElement("div",{className:"admin-dashboard__grid"},e.default.createElement(fe,{title:"Single Types",items:_a,navigate:t,meta:"Edit structured page content"}),e.default.createElement(fe,{title:"Customers",items:wa,navigate:t,meta:"Review customers and incoming messages"}),e.default.createElement(fe,{title:"Orders",items:Na,navigate:t,meta:"Review orders and invoices"}),e.default.createElement(fe,{title:"Collections",items:ya,navigate:t,meta:"Manage repeatable content"}),e.default.createElement(za,{submissions:g,selectedSubmission:i,onOpen:E,onDelete:S,deletingId:u,operationError:f})))))}const Ma=/(description|content|message|body|subtitle|excerpt|intro|hours|address|text|paragraph|overview|challenge|result|answer|notes)/i,Be=/(image|coverImage|contentImages)/i,Re=/^(featured|isFeatured|isPopular)$/i,qe=/(description|content|answer|excerpt|contentImages|coverImage|image|features|badges|tags)$/i,He=`
.admin-editor {
  min-height: 100%;
  padding: 32px 40px 64px 40px;
  background: #f6f6f9;
  color: #32324d;
}
.admin-editor__inner {
  max-width: 1240px;
  margin: 0 auto;
}
.admin-back {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  border: 0;
  background: transparent;
  color: #4945ff;
  font-size: .875rem;
  cursor: pointer;
  padding: 0;
  margin-bottom: 14px;
}
.admin-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 24px;
  margin-bottom: 12px;
}
.admin-meta {
  margin-bottom: 4px;
  color: #666687;
  font-size: .75rem;
  font-weight: 700;
  text-transform: uppercase;
}
.admin-title {
  margin: 0;
  font-size: 2.25rem;
  line-height: 2.75rem;
  font-weight: 700;
}
.admin-status {
  display: inline-flex;
  align-items: center;
  min-height: 2rem;
  padding: 0 .75rem;
  margin-top: 14px;
  border: 1px solid #c6f0c2;
  border-radius: 4px;
  background: #efffed;
  color: #2f6846;
  font-size: .8125rem;
  font-weight: 600;
}
.admin-kebab {
  width: 2rem;
  height: 2rem;
  border: 1px solid #dcdce4;
  border-radius: 4px;
  background: #fff;
}
.admin-tabs {
  display: flex;
  gap: 24px;
  margin-bottom: 24px;
  border-bottom: 1px solid #eaeaef;
}
.admin-tab {
  position: relative;
  border: 0;
  background: transparent;
  padding: 0 0 12px;
  color: #666687;
  font-size: .75rem;
  font-weight: 700;
}
.admin-tab--active { color: #4945ff; }
.admin-tab--active::after {
  content: '';
  position: absolute;
  left: 0; right: 0; bottom: -1px;
  height: 2px;
  background: #4945ff;
}
.admin-layout {
  display: grid;
  grid-template-columns: minmax(0,1fr) 232px;
  gap: 16px;
  align-items: start;
}
.admin-main-card,.admin-side-card,.admin-list-card {
  border: 1px solid #dcdce4;
  border-radius: 4px;
  background: #fff;
  box-shadow: 0 1px 2px rgba(33,33,52,.06);
}
.admin-main-card { padding: 24px; }
.admin-side-card + .admin-side-card { margin-top: 12px; }
.admin-side-card__head {
  padding: 14px 16px 8px;
  color: #666687;
  font-size: .75rem;
  font-weight: 700;
  text-transform: uppercase;
}
.admin-side-card__body { padding: 0 12px 12px; }
.admin-side-note {
  color: #666687;
  font-size: .875rem;
  line-height: 1.5rem;
}
.admin-side-button-row {
  display: flex;
  gap: 8px;
  margin-bottom: 8px;
  position: relative;
}
.admin-side-button,.admin-side-button--secondary {
  width: 100%;
  min-height: 2.25rem;
  border-radius: 4px;
  font-size: .8125rem;
  font-weight: 600;
}
.admin-side-button {
  border: 1px solid #4945ff;
  background: #4945ff;
  color: #fff;
}
.admin-side-button--secondary {
  border: 1px solid #dcdce4;
  background: #fff;
  color: #32324d;
}
.admin-side-button:disabled,
.admin-side-button--secondary:disabled,
.admin-primary:disabled,
.admin-secondary:disabled {
  border-color: #dcdce4;
  background: #f6f6f9;
  color: #8e8ea9;
  cursor: not-allowed;
}
.admin-side-action-menu {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  width: 220px;
  border: 1px solid #dcdce4;
  border-radius: 4px;
  background: #fff;
  box-shadow: 0 12px 32px rgba(33,33,52,.12);
  padding: 8px 0;
  z-index: 40;
}
.admin-side-action-menu__item {
  width: 100%;
  border: 0;
  background: transparent;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  color: #32324d;
  font-size: 0.875rem;
  line-height: 1.25rem;
  cursor: pointer;
  text-align: left;
}
.admin-side-action-menu__item:hover {
  background: #f6f6f9;
}
.admin-side-action-menu__item--danger {
  color: #d02b20;
}
.admin-side-action-menu__item:disabled {
  background: transparent;
  color: #8e8ea9;
  cursor: not-allowed;
}
.admin-side-action-menu__icon {
  width: 18px;
  color: inherit;
  text-align: center;
}
.admin-side-button--menu {
  width: 2rem;
  flex: 0 0 2rem;
}
.admin-section + .admin-section { margin-top: 20px; }
.admin-field-grid {
  display: grid;
  grid-template-columns: repeat(2,minmax(0,1fr));
  gap: 20px 24px;
}
.admin-field--full { grid-column: 1 / -1; }
.admin-profile-card {
  max-width: 100%;
  border-radius: 20px;
  background: transparent;
  padding: 6px 6px 0;
}
.admin-profile-card__head {
  padding: 0 0 12px;
}
.admin-profile-card__identity {
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 0;
}
.admin-profile-card__avatar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 52px;
  height: 52px;
  flex: 0 0 52px;
  border-radius: 16px;
  background: linear-gradient(135deg, #4945ff 0%, #7b79ff 100%);
  color: #ffffff;
  font-size: .95rem;
  line-height: 1;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
.admin-profile-card__head-copy {
  min-width: 0;
}
.admin-profile-card__title-row {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}
.admin-profile-card__eyebrow {
  margin-bottom: 6px;
  color: #7c7c98;
  font-size: .72rem;
  line-height: 1rem;
  font-weight: 700;
  letter-spacing: .12em;
  text-transform: uppercase;
}
.admin-profile-card__title {
  margin: 0;
  color: #32324d;
  font-size: clamp(1.45rem, 2.2vw, 2rem);
  line-height: 1.02;
  letter-spacing: -.04em;
  font-weight: 700;
}
.admin-profile-card__body {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 8px;
  padding: 0 0 6px;
}
.admin-profile-card__body--customer {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}
.admin-profile-card__row {
  width: 100%;
  padding: 10px 12px 6px;
}
.admin-profile-card__item {
  min-width: 0;
  padding: 10px 12px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.82);
}
.admin-profile-card__item--full {
  grid-column: 1 / -1;
}
.admin-profile-card__label {
  color: #7c7c98;
  font-size: .72rem;
  line-height: 1rem;
  font-weight: 700;
  letter-spacing: .12em;
  text-transform: uppercase;
}
.admin-profile-card__value {
  margin-top: 10px;
  color: #32324d;
  font-size: 1.1rem;
  line-height: 1.45;
  font-weight: 600;
  word-break: break-word;
}
.admin-profile-card__value--muted {
  color: #8e8ea9;
}
.admin-profile-card__value--mono {
  display: inline-flex;
  align-items: center;
  padding: .24rem .62rem;
  border-radius: 999px;
  background: rgba(73, 69, 255, 0.08);
  color: #4b47be;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace;
  font-size: .82rem;
  line-height: 1.1rem;
}
.admin-profile-card__value--multiline {
  white-space: pre-line;
}
.admin-profile-card__textbox {
  width: 100%;
  box-sizing: border-box;
  margin-top: 10px;
  padding: .875rem 1rem;
  border: 1px solid #dcdce4;
  border-radius: 12px;
  background: #f6f6f9;
  color: #666687;
  font: inherit;
  line-height: 1.55;
  resize: none;
}
.admin-reply-panel {
  max-width: 660px;
  margin-top: 12px;
  border-radius: 16px;
  background: #fff;
  border: 1px solid #eaeaef;
  padding: 18px 20px;
}
.admin-reply-panel__title {
  margin: 0 0 6px;
  color: #32324d;
  font-size: 1rem;
  line-height: 1.4;
  font-weight: 700;
}
.admin-reply-panel__note {
  margin: 0 0 14px;
  color: #666687;
  font-size: .875rem;
  line-height: 1.5;
}
.admin-reply-panel__history {
  display: grid;
  gap: 12px;
  margin-bottom: 16px;
}
.admin-reply-panel__item {
  padding: 14px 16px;
  border-radius: 14px;
  background: #f6f6f9;
}
.admin-reply-panel__meta {
  color: #666687;
  font-size: .78rem;
  line-height: 1.3;
  margin-bottom: 8px;
}
.admin-reply-panel__subject {
  color: #32324d;
  font-size: .95rem;
  line-height: 1.4;
  font-weight: 700;
}
.admin-reply-panel__body {
  margin-top: 8px;
  color: #666687;
  font-size: .9rem;
  line-height: 1.6;
  white-space: pre-line;
}
.admin-reply-panel__form {
  display: grid;
  gap: 12px;
}
.admin-reply-panel__actions {
  display: flex;
  justify-content: flex-end;
}
.admin-label {
  display: inline-flex;
  align-items: center;
  gap: 2px;
  margin-bottom: 6px;
  color: #32324d;
  font-size: .75rem;
  font-weight: 600;
}
.admin-label__required { color: #d02b20; }
.admin-input,.admin-textarea,.admin-search-input {
  width: 100%;
  box-sizing: border-box;
  border: 1px solid #dcdce4;
  border-radius: 4px;
  background: #fff;
  color: #32324d;
  padding: .625rem .875rem;
  font-size: .875rem;
  line-height: 1.25rem;
  outline: none;
}
.admin-input { min-height: 2.5rem; }
.admin-textarea { min-height: 5.75rem; resize: vertical; }
.admin-input:focus,.admin-textarea:focus,.admin-search-input:focus {
  border-color: #4945ff;
  box-shadow: 0 0 0 1px #4945ff;
}
.admin-input:disabled,
.admin-textarea:disabled {
  background: #f6f6f9;
  color: #666687;
  cursor: not-allowed;
}
.admin-repeatable {
  border: 1px solid #dcdce4;
  border-radius: 4px;
  overflow: hidden;
  background: #fff;
}
.admin-repeatable__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px 10px;
  border-bottom: 1px solid #f0f0f5;
}
.admin-repeatable__title { font-size: .75rem; font-weight: 600; }
.admin-repeatable__count { color: #8e8ea9; font-size: .75rem; }
.admin-repeatable__item + .admin-repeatable__item { border-top: 1px solid #f0f0f5; }
.admin-repeatable__item--drag-over summary { background: #f0f0ff; }
.admin-repeatable__summary {
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 12px 16px;
  cursor: pointer;
}
.admin-repeatable__summary::-webkit-details-marker { display: none; }
.admin-repeatable__summary-left {
  display: flex;
  align-items: center;
  gap: 12px;
}
.admin-repeatable__bullet {
  width: 20px; height: 20px;
  border-radius: 999px;
  background: #f0f0f5;
  color: #666687;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: .625rem;
}
.admin-repeatable__name { font-size: .875rem; font-weight: 600; }
.admin-repeatable__actions {
  display: flex; align-items: center; gap: 10px;
  color: #8e8ea9;
}
.admin-repeatable__icon-button {
  border: 0; background: transparent; color: inherit; cursor: pointer;
}
.admin-repeatable__drag-handle {
  border: 0;
  background: transparent;
  color: #8e8ea9;
  cursor: grab;
  padding: 0 2px;
  font-size: 1rem;
  line-height: 1;
}
.admin-repeatable__drag-handle:active { cursor: grabbing; }
.admin-repeatable__drag-handle:disabled {
  color: #c4c4d2;
  cursor: not-allowed;
}
.admin-repeatable__icon-button:disabled,
.admin-repeatable__add:disabled {
  color: #8e8ea9;
  cursor: not-allowed;
}
.admin-repeatable__body { padding: 16px; }
.admin-repeatable__add {
  width: 100%;
  border: 0;
  border-top: 1px solid #f0f0f5;
  background: #fff;
  color: #4945ff;
  font-size: .875rem;
  font-weight: 600;
  padding: 14px 16px;
  cursor: pointer;
}
.admin-repeatable__image-preview {
  margin-top: 10px;
}
.admin-repeatable__image-preview .admin-media__thumb {
  max-width: 280px;
  max-height: 180px;
}
.admin-toggle {
  min-height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: .625rem .875rem;
  border: 1px solid #dcdce4;
  border-radius: 4px;
}
.admin-field--boolean .admin-toggle {
  width: auto;
  min-width: 180px;
  justify-content: flex-start;
  gap: 10px;
}
.admin-toggle:has(input:disabled) {
  background: #f6f6f9;
  color: #666687;
}
.admin-media {
  border: 1px solid #dcdce4;
  border-radius: 4px;
  background: #fff;
  padding: 16px;
}
.admin-media__canvas {
  min-height: 140px;
  border: 1px solid #dcdce4;
  border-radius: 4px;
  background: #fafafb;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
}
.admin-media__stack {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}
.admin-media__thumb {
  max-width: 240px;
  max-height: 140px;
  object-fit: cover;
}
.admin-media__actions {
  display: flex;
  gap: 4px;
}
.admin-media__action {
  width: 2rem; height: 2rem;
  border: 1px solid #dcdce4;
  border-radius: 4px;
  background: #fff;
}
.admin-media__action:disabled {
  background: #f6f6f9;
  color: #8e8ea9;
  cursor: not-allowed;
}
.admin-media__filename { color: #666687; font-size: .75rem; }
.admin-media__source { margin-top: 10px; }
.admin-media__source-actions {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 8px;
}
.admin-media__upload-button {
  min-height: 2rem;
  padding: 0 0.75rem;
  border: 1px solid #dcdce4;
  border-radius: 4px;
  background: #fff;
  color: #32324d;
  font-size: 0.75rem;
  font-weight: 600;
  cursor: pointer;
}
.admin-media__upload-button:disabled {
  background: #f6f6f9;
  color: #8e8ea9;
  cursor: not-allowed;
}
.admin-media__error {
  color: #d02b20;
  font-size: 0.75rem;
  line-height: 1rem;
}
.admin-list-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 16px;
}
.admin-list-actions {
  display: flex;
  gap: 12px;
  align-items: center;
}
.admin-search-wrap { width: 280px; }
.admin-list-meta {
  margin: 12px 0 32px;
  color: #666687;
  font-size: 0.875rem;
  line-height: 1.25rem;
}
.admin-toolbar-cluster {
  display: flex;
  align-items: center;
  gap: 12px;
  position: relative;
}
.admin-toolbar-button {
  min-height: 2.5rem;
  padding: 0 1rem;
  border: 1px solid #dcdce4;
  border-radius: 4px;
  background: #fff;
  color: #32324d;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
}
.admin-toolbar-button--icon {
  width: 2.5rem;
  padding: 0;
}
.admin-toolbar-button--active {
  border-color: #4945ff;
  color: #4945ff;
}
.admin-toolbar-search {
  width: 280px;
  min-height: 2.5rem;
  border: 1px solid #dcdce4;
  border-radius: 4px;
  padding: 0 0.875rem;
  font-size: 0.875rem;
}
.admin-list-popover {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  width: 320px;
  max-height: 420px;
  overflow: auto;
  border: 1px solid #dcdce4;
  border-radius: 4px;
  background: #fff;
  box-shadow: 0 12px 32px rgba(33,33,52,.12);
  padding: 16px;
  z-index: 20;
}
.admin-list-popover__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 14px;
}
.admin-list-popover__title {
  font-size: 1rem;
  font-weight: 700;
}
.admin-list-popover__reset {
  border: 0;
  background: transparent;
  color: #4945ff;
  font-size: 0.875rem;
  cursor: pointer;
  padding: 0;
}
.admin-list-popover__group + .admin-list-popover__group {
  margin-top: 16px;
}
.admin-list-popover__label {
  display: block;
  margin-bottom: 8px;
  color: #666687;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
}
.admin-list-popover__select {
  width: 100%;
  min-height: 2.5rem;
  border: 1px solid #dcdce4;
  border-radius: 4px;
  background: #fff;
  padding: 0 0.75rem;
  font-size: 0.875rem;
}
.admin-list-popover__check {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 0;
  font-size: 0.875rem;
}
.admin-list-popover__check input {
  width: 1.25rem;
  height: 1.25rem;
}
.admin-list-card__head {
  padding: 16px 20px;
  border-bottom: 1px solid #f0f0f5;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.admin-list-table {
  width: 100%;
  border-collapse: collapse;
}
.admin-list-table th {
  padding: 10px 16px;
  text-align: left;
  color: #666687;
  font-size: .75rem;
  font-weight: 700;
  text-transform: uppercase;
}
.admin-list-table td {
  padding: 14px 16px;
  border-top: 1px solid #f0f0f5;
  font-size: .875rem;
  vertical-align: middle;
}
.admin-list-row-menu-cell {
  position: relative;
  width: 44px;
}
.admin-list-row-menu-trigger {
  width: 2rem;
  height: 2rem;
  border: 0;
  background: transparent;
  color: #8e8ea9;
  font-size: 1.25rem;
  line-height: 1;
  cursor: pointer;
}
.admin-list-row-menu {
  position: absolute;
  top: calc(100% - 6px);
  right: 0;
  width: 220px;
  border: 1px solid #dcdce4;
  border-radius: 4px;
  background: #fff;
  box-shadow: 0 12px 32px rgba(33,33,52,.12);
  padding: 8px 0;
  z-index: 24;
}
.admin-list-row-menu__item {
  width: 100%;
  border: 0;
  background: transparent;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  color: #32324d;
  font-size: 0.875rem;
  line-height: 1.25rem;
  cursor: pointer;
  text-align: left;
}
.admin-list-row-menu__item:hover {
  background: #f6f6f9;
}
.admin-list-row-menu__item--danger {
  color: #d02b20;
}
.admin-list-row-menu__icon {
  width: 18px;
  color: inherit;
  text-align: center;
}
.admin-list-table th button {
  border: 0;
  background: transparent;
  padding: 0;
  color: inherit;
  font: inherit;
  text-transform: inherit;
  cursor: pointer;
}
.admin-list-table tr { cursor: pointer; }
.admin-list-table tr:hover { background: #fafafb; }
.admin-list-status {
  display: inline-flex;
  align-items: center;
  min-height: 1.75rem;
  padding: 0 .625rem;
  border-radius: 999px;
  background: #efffed;
  color: #2f6846;
  font-size: .75rem;
  font-weight: 600;
}
.admin-list-status--manual {
  background: rgba(73, 69, 255, 0.12);
  color: #4945ff;
}
.admin-primary {
  min-height: 2.25rem;
  padding: 0 .875rem;
  border: 1px solid #4945ff;
  background: #4945ff;
  color: #fff;
  border-radius: 4px;
  font-size: .8125rem;
  font-weight: 600;
  cursor: pointer;
}
.admin-secondary {
  min-height: 2.25rem;
  padding: 0 .875rem;
  border: 1px solid #dcdce4;
  background: #fff;
  color: #32324d;
  border-radius: 4px;
  font-size: .8125rem;
  font-weight: 600;
  cursor: pointer;
}
.admin-list-boolean {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1rem;
  height: 1rem;
  border-radius: 999px;
  font-size: 0.625rem;
  font-weight: 700;
}
.admin-list-boolean--yes {
  background: #2f6846;
  color: #fff;
}
.admin-list-boolean--no {
  background: #d02b20;
  color: #fff;
}
@media (max-width: 1180px) {
  .admin-layout { grid-template-columns: 1fr; }
}
@media (max-width: 960px) {
  .admin-editor { padding: 20px 16px 48px; }
  .admin-field-grid { grid-template-columns: 1fr; }
  .admin-profile-card {
    padding: 4px 4px 0;
    border-radius: 16px;
  }
  .admin-profile-card__head { padding-bottom: 10px; }
  .admin-profile-card__identity { align-items: flex-start; }
  .admin-profile-card__avatar {
    width: 48px;
    height: 48px;
    flex-basis: 48px;
    border-radius: 14px;
    font-size: .9rem;
  }
  .admin-profile-card__body,
  .admin-profile-card__body--customer { grid-template-columns: 1fr; gap: 10px; }
  .admin-list-toolbar { flex-direction: column; align-items: stretch; }
  .admin-search-wrap { width: 100%; }
}
`;function We(a){return a.replace(/([a-z0-9])([A-Z])/g,"$1 $2").replace(/[_-]+/g," ").replace(/\bfaq\b/gi,"FAQ").replace(/^./,t=>t.toUpperCase())}function Z(a){return JSON.parse(JSON.stringify(a))}function Je(a){return Array.isArray(a)?[]:a&&typeof a=="object"?Object.fromEntries(Object.keys(a).map(t=>["id","documentId","status","updatedAt","publishedAt"].includes(t)?[t,a[t]??null]:[t,Je(a[t])])):typeof a=="boolean"?!1:typeof a=="number"?0:""}function ne(a){return Array.isArray(a)?a.map(t=>ne(t)):a&&typeof a=="object"?Object.keys(a).sort().filter(t=>!["updatedAt","publishedAt","status"].includes(t)).reduce((t,n)=>(t[n]=ne(a[n]),t),{}):a}function ke(a){return Array.isArray(a)?a.some(t=>ke(t)):a&&typeof a=="object"?Object.entries(a).filter(([t])=>!["id","documentId","updatedAt","publishedAt","status"].includes(t)).some(([,t])=>ke(t)):typeof a=="string"?a.trim().length>0:typeof a=="number"?a!==0:typeof a=="boolean"?a:a!=null}function se(a,t){const n=new URLSearchParams;Object.entries(t).forEach(([i,d])=>{d!=null&&d!==""&&n.set(i,String(d))});const r=n.toString();return`${a}${r?`?${r}`:""}`}function Oa(a){return String(a??"").split(",").map(t=>t.trim()).filter(Boolean)}function Se(a,t){if(typeof t=="number"){if(a==="")return 0;const n=Number(a);return Number.isNaN(n)?t:n}return a}function pe(a){return typeof a=="string"?a:a&&typeof a=="object"?String(a.text??""):""}function ja(a,t="Uploaded image"){const n=String(a??"").trim();if(!n)return t;const i=n.split("?")[0].split("#")[0].split("/").filter(Boolean);return i[i.length-1]||t}function ge(a,t){return typeof a=="string"?t:a&&typeof a=="object"?{...a,text:t}:{text:t}}function Ce(a){if(!a)return"";const t=String(a).trim();return t?/^https?:\/\//i.test(t)?t:t.startsWith("//")?`https:${t}`:t.startsWith("/uploads/")||t.startsWith("/admin-assets/")?`http://localhost:3001${t}`:t:""}function Ve(a,t,n){if(!t.length)return n;const[r,...i]=t,d=Array.isArray(a)?[...a]:{...a};return d[r]=Ve(a?.[r],i,n),d}function Ge(a,t){if(t.length===1)return Array.isArray(a)?a.filter((d,u)=>u!==t[0]):a;const[n,...r]=t,i=Array.isArray(a)?[...a]:{...a};return i[n]=Ge(a?.[n],r),i}function Ye(a,t,n){if(!t.length)return[...Array.isArray(a)?a:[],n];const[r,...i]=t,d=Array.isArray(a)?[...a]:{...a};return d[r]=Ye(a?.[r],i,n),d}function Qe(a,t,n){if(t.length===1){if(!Array.isArray(a))return a;const u=t[0],s=u+n;if(s<0||s>=a.length)return a;const f=[...a],[b]=f.splice(u,1);return f.splice(s,0,b),f}const[r,...i]=t,d=Array.isArray(a)?[...a]:{...a};return d[r]=Qe(a?.[r],i,n),d}function Ua(a,t){return t&&t[a.titleField]||a.label}function Ba(a,t){const n=Number(a??0),r=String(t||"GBP").toUpperCase();try{return new Intl.NumberFormat("en-GB",{style:"currency",currency:r}).format(n/100)}catch{return`${r} ${(n/100).toFixed(2)}`}}function Xe(a,t,n,r){const i=typeof n=="string"?n.trim():n;return i===""||i==null?"Not set":Array.isArray(a?.moneyFields)&&a.moneyFields.includes(t)?Ba(n,r?.currency):typeof n=="string"&&/^(status|.*Status|bookingType|resourceType|accessStatus)$/i.test(t)?n.replace(/[_-]+/g," ").replace(/\b\w/g,d=>d.toUpperCase()):String(n)}function Ra(a,t){return a?.name==="blog-posts"&&t==="featured"}function qa(a,t){return a?.name==="faq-items"&&t==="isFeatured"}function Ha(a,t){return a?.name==="meeting-rooms"&&t==="isFeatured"}function Ze(a,t){return Ra(a,t)||qa(a,t)||Ha(a,t)}function Ae(a,t){return Ze(a,t)?"Visibility":We(t)}async function be(a,t={}){const r=new URLSearchParams(t.query??{}).toString(),i=await fetch(`/admin/api/pages/${a}${r?`?${r}`:""}`,{method:t.method??"GET",headers:{Accept:"application/json","Content-Type":"application/json"},body:t.body?JSON.stringify(t.body):void 0,credentials:"same-origin"}),d=await i.text();let u=null;try{u=d?JSON.parse(d):{}}catch{u=null}if(!i.ok||!u){const s=d.trim().toLowerCase(),f=s.startsWith("<!doctype")||s.startsWith("<html"),b=i.redirected&&i.url.includes("/admin/login");throw i.status===401||i.status===403||b?new Error("Your admin session expired. Refresh and sign in again."):u?.message?new Error(u.message):u?.error?new Error(u.error):f?new Error(`Server returned an HTML error page (${i.status||"unknown"}). Check backend logs.`):i.status?new Error(`Request failed (${i.status}).`):new Error("Request failed.")}return u}async function Ke(a){const t=new FormData;t.append("file",a);const n=await fetch("/admin/api/media/upload",{method:"POST",body:t,credentials:"same-origin"}),r=await n.json().catch(()=>({}));if(!n.ok)throw new Error(r.error||"Failed to upload image.");const i=r?.url||r?.item?.relativeUrl||r?.item?.url;if(!i)throw new Error("Upload succeeded but returned no URL.");return i}const Wa="adminjs-media-select";function ea(){return new Promise((a,t)=>{if(typeof window>"u"){a("");return}const n=window.open("/admin/pages/media-library?picker=1","admin-media-library-picker","popup=yes,width=1440,height=900,resizable=yes,scrollbars=yes");if(!n){t(new Error("Media library popup was blocked."));return}let r=!1;const i=()=>{window.removeEventListener("message",d),window.clearInterval(u)},d=s=>{s.origin!==window.location.origin||s.source!==n||s.data?.type===Wa&&(r=!0,i(),a(typeof s.data.url=="string"?s.data.url:""))},u=window.setInterval(()=>{n.closed&&!r&&(i(),a(""))},500);window.addEventListener("message",d)})}function Ja({label:a,value:t,path:n,onChange:r,disabled:i}){const d=Array.isArray(t)?t:[t].filter(Boolean),u=o.useRef(null),[s,f]=o.useState(!1),[b,g]=o.useState("");return e.default.createElement("div",{className:"admin-field admin-field--full"},e.default.createElement("label",{className:"admin-label"},a),e.default.createElement("div",{className:"admin-media"},e.default.createElement("div",{className:"admin-media__canvas"},d.length?e.default.createElement("div",{className:"admin-media__stack"},e.default.createElement("img",{className:"admin-media__thumb",src:d[0],alt:a}),e.default.createElement("div",{className:"admin-media__actions"},e.default.createElement("button",{className:"admin-media__action",type:"button",onClick:()=>window.open(d[0],"_blank","noopener,noreferrer")},"\u2197"),e.default.createElement("button",{className:"admin-media__action",type:"button",disabled:i,onClick:()=>r(n,Array.isArray(t)?[]:"")},"\u2715")),e.default.createElement("div",{className:"admin-media__filename"},ja(d[0]))):e.default.createElement("div",null,"No media selected.")),e.default.createElement("div",{className:"admin-media__source"},e.default.createElement("div",{className:"admin-media__source-actions"},e.default.createElement("button",{className:"admin-media__upload-button",type:"button",disabled:i||s,onClick:()=>u.current?.click()},s?"Uploading...":"Upload from computer"),e.default.createElement("button",{className:"admin-media__upload-button",type:"button",disabled:i||s,onClick:async()=>{g("");try{const E=await ea();if(!E)return;Array.isArray(t)?r(n,[...t,E]):r(n,E)}catch(E){g(E?.message||"Failed to choose image from media library.")}}},"Choose from media library"),e.default.createElement("input",{ref:u,type:"file",accept:"image/*",multiple:Array.isArray(t),style:{display:"none"},onChange:async E=>{const S=Array.from(E.target.files??[]);if(E.target.value="",!!S.length){g(""),f(!0);try{const h=[];for(const x of S){const _=await Ke(x);h.push(_)}Array.isArray(t)?r(n,[...t,...h]):r(n,h[0]||"")}catch(h){g(h?.message||"Failed to upload image.")}finally{f(!1)}}}})),b?e.default.createElement("div",{className:"admin-media__error"},b):null)))}function Va({definition:a,field:t,value:n,path:r,onChange:i,disabled:d}){const u=Ae(a,t),s=Array.isArray(a?.selectFields?.[t])?a.selectFields[t]:null,f=a?.inputTypes?.[t]||(typeof n=="number"?"number":"text");if(Be.test(t))return e.default.createElement(Ja,{label:u,value:n,path:r,onChange:i,disabled:d});if(Re.test(t)){const g=Ze(a,t);return e.default.createElement("div",{className:"admin-field admin-field--boolean"},e.default.createElement("label",{className:"admin-label"},u),e.default.createElement("div",{className:"admin-toggle"},e.default.createElement("span",null,g?"Hide on website":n?"Active":"Disabled"),e.default.createElement("input",{type:"checkbox",checked:!!n,disabled:d,onChange:E=>i(r,E.target.checked)})))}const b=qe.test(t)?"admin-field admin-field--full":"admin-field";return e.default.createElement("div",{className:b},e.default.createElement("label",{className:"admin-label"},u,t!=="sortOrder"&&!Re.test(t)?e.default.createElement("span",{className:"admin-label__required"},"*"):null),s?e.default.createElement("select",{className:"admin-input",value:n??"",disabled:d,onChange:g=>i(r,Se(g.target.value,n))},s.map(g=>e.default.createElement("option",{key:g.value,value:g.value},g.label))):Ma.test(t)?e.default.createElement("textarea",{className:"admin-textarea",value:n??"",disabled:d,onChange:g=>i(r,Se(g.target.value,n))}):e.default.createElement("input",{className:"admin-input",type:f,value:n??"",disabled:d,onChange:g=>i(r,Se(g.target.value,n))}))}function Ga({definition:a,record:t}){const n=Array.isArray(a.infoCardFields)?a.infoCardFields:[],r=Array.isArray(a.infoCardBlockFields)?a.infoCardBlockFields:[],i=new Set(Array.isArray(a.optionalInfoCardFields)?a.optionalInfoCardFields:[]),d=new Set(Array.isArray(a.optionalInfoCardBlockFields)?a.optionalInfoCardBlockFields:[]),u=a.infoCardTitleField||a.titleField,s=t?.[u],f=s==null||String(s).trim()===""?a.label:String(s),b=a.metaLabel||a.label||"Record",g=b.endsWith("s")?b.slice(0,-1):b,S=f.split(/\s+/).map(m=>m.trim()).filter(Boolean).slice(0,2).map(m=>m[0]).join("").toUpperCase()||"ID",h=typeof t?.manualTag=="string"?t.manualTag.trim():"",x=a?.name==="customers"||a?.name==="messages"||a?.name==="orders"||a?.name==="invoices"||a?.name==="refunds",_=n.filter(m=>m!=="manualTag"&&!r.includes(m));return n.length?e.default.createElement("section",{className:"admin-section"},e.default.createElement("div",{className:"admin-profile-card"},e.default.createElement("div",{className:"admin-profile-card__head"},e.default.createElement("div",{className:"admin-profile-card__identity"},e.default.createElement("div",{className:"admin-profile-card__avatar","aria-hidden":"true"},S),e.default.createElement("div",{className:"admin-profile-card__head-copy"},e.default.createElement("div",{className:"admin-profile-card__eyebrow"},g),e.default.createElement("div",{className:"admin-profile-card__title-row"},e.default.createElement("h2",{className:"admin-profile-card__title"},f),h?e.default.createElement("span",{className:"admin-list-status admin-list-status--manual"},h):null)))),e.default.createElement("div",{className:`admin-profile-card__body${x?" admin-profile-card__body--customer":""}`},_.map(m=>{const l=Ae(a,m),y=Xe(a,m,t?.[m],t),w=["admin-profile-card__value"];return i.has(m)&&y==="Not set"?null:(y==="Not set"&&w.push("admin-profile-card__value--muted"),(m==="id"||m.endsWith("Id"))&&w.push("admin-profile-card__value--mono"),typeof y=="string"&&y.includes(`
`)&&w.push("admin-profile-card__value--multiline"),e.default.createElement("div",{key:m,className:`admin-profile-card__item${qe.test(m)?" admin-profile-card__item--full":""}`},e.default.createElement("div",{className:"admin-profile-card__label"},l),e.default.createElement("div",{className:w.join(" ")},y)))})),r.map(m=>{const l=Xe(a,m,t?.[m],t);return d.has(m)&&l==="Not set"?null:e.default.createElement("div",{key:m,className:"admin-profile-card__row"},e.default.createElement("div",{className:"admin-profile-card__label"},Ae(a,m)),e.default.createElement("textarea",{className:"admin-profile-card__textbox",value:l,rows:Math.max(4,Math.min(10,String(l).split(`
`).length+1)),disabled:!0,readOnly:!0}))}))):null}function Ya({replies:a,replyDraft:t,onReplyChange:n,onSendReply:r,sendingReply:i}){return e.default.createElement("section",{className:"admin-section"},e.default.createElement("div",{className:"admin-reply-panel"},e.default.createElement("h3",{className:"admin-reply-panel__title"},"Reply to Customer"),e.default.createElement("p",{className:"admin-reply-panel__note"},"Send an email response directly from this message detail page."),a.length?e.default.createElement("div",{className:"admin-reply-panel__history"},a.map(d=>e.default.createElement("div",{key:d.id,className:"admin-reply-panel__item"},e.default.createElement("div",{className:"admin-reply-panel__meta"},d.createdAt," \u2022 ",d.adminEmail),e.default.createElement("div",{className:"admin-reply-panel__subject"},d.subject),e.default.createElement("div",{className:"admin-reply-panel__body"},d.body)))):null,e.default.createElement("div",{className:"admin-reply-panel__form"},e.default.createElement("div",{className:"admin-field"},e.default.createElement("label",{className:"admin-label"},"Reply Subject"),e.default.createElement("input",{className:"admin-input",type:"text",value:t.subject,onChange:d=>n("subject",d.target.value)})),e.default.createElement("div",{className:"admin-field admin-field--full"},e.default.createElement("label",{className:"admin-label"},"Reply Message"),e.default.createElement("textarea",{className:"admin-textarea",value:t.body,rows:8,onChange:d=>n("body",d.target.value)})),e.default.createElement("div",{className:"admin-reply-panel__actions"},e.default.createElement("button",{className:"admin-primary",type:"button",onClick:r,disabled:i},i?"Sending...":"Send Reply")))))}function Qa({field:a,value:t,path:n,onChange:r,onAddItem:i,onRemoveItem:d,onMoveItem:u,disabled:s}){const f=We(a),b=Array.isArray(t)?t:[],g=Be.test(a),[E,S]=o.useState(null),[h,x]=o.useState(null),[_,m]=o.useState(null),[l,y]=o.useState(""),w=o.useRef({});return e.default.createElement("div",{className:"admin-field admin-field--full"},e.default.createElement("label",{className:"admin-label"},f),e.default.createElement("div",{className:"admin-repeatable"},e.default.createElement("div",{className:"admin-repeatable__head"},e.default.createElement("div",null,e.default.createElement("div",{className:"admin-repeatable__title"},f),e.default.createElement("div",{className:"admin-repeatable__count"},b.length," entries"))),b.map((p,v)=>e.default.createElement("details",{key:`${a}-${v}`,className:`admin-repeatable__item${h===v?" admin-repeatable__item--drag-over":""}`,open:v===0,onDragOver:c=>{s||E===null||(c.preventDefault(),h!==v&&x(v))},onDrop:c=>{if(s||E===null)return;c.preventDefault();const L=v-E;L!==0&&u([...n,E],L),S(null),x(null)},onDragLeave:()=>{h===v&&x(null)}},e.default.createElement("summary",{className:"admin-repeatable__summary"},e.default.createElement("div",{className:"admin-repeatable__summary-left"},e.default.createElement("span",{className:"admin-repeatable__bullet"},"\u25BC"),e.default.createElement("span",{className:"admin-repeatable__name"},g?`Image ${v+1}`:typeof p=="string"?p||`${f} ${v+1}`:p?.text||`${f} ${v+1}`)),e.default.createElement("div",{className:"admin-repeatable__actions"},e.default.createElement("button",{className:"admin-repeatable__icon-button",type:"button",disabled:s,onClick:c=>{c.preventDefault(),c.stopPropagation(),d([...n,v])},"aria-label":"Delete"},"\u{1F5D1}"),e.default.createElement("button",{className:"admin-repeatable__drag-handle",type:"button",draggable:!s,disabled:s,title:"Drag to reorder",onClick:c=>{c.preventDefault(),c.stopPropagation()},onDragStart:c=>{s||(c.stopPropagation(),c.dataTransfer.effectAllowed="move",c.dataTransfer.setData("text/plain",String(v)),S(v),x(v))},onDragEnd:()=>{S(null),x(null)}},"\u22EE\u22EE"))),e.default.createElement("div",{className:"admin-repeatable__body"},e.default.createElement("div",{className:"admin-field-grid"},e.default.createElement("div",{className:"admin-field admin-field--full"},g?null:e.default.createElement("label",{className:"admin-label"},f==="Tags"?"Text":f.slice(0,-1)||f),g?null:e.default.createElement("input",{className:"admin-input",value:pe(p),disabled:s,onChange:c=>{r([...n,v],ge(p,c.target.value))}}),g&&Ce(pe(p))?e.default.createElement(e.default.Fragment,null,e.default.createElement("div",{className:"admin-media__canvas admin-repeatable__image-preview"},e.default.createElement("img",{className:"admin-media__thumb",src:Ce(pe(p)),alt:`${f} ${v+1}`})),e.default.createElement("div",{className:"admin-media__source-actions",style:{marginTop:"10px"}},e.default.createElement("button",{className:"admin-media__action",type:"button",onClick:()=>window.open(Ce(pe(p)),"_blank","noopener,noreferrer")},"\u2197"),e.default.createElement("button",{className:"admin-media__action",type:"button",disabled:s,onClick:()=>r([...n,v],ge(p,""))},"\u2715"))):null,g?e.default.createElement("div",{className:"admin-media__source-actions"},e.default.createElement("button",{className:"admin-media__upload-button",type:"button",disabled:s||_===v,onClick:()=>w.current[v]?.click()},_===v?"Uploading...":"Upload from computer"),e.default.createElement("button",{className:"admin-media__upload-button",type:"button",disabled:s||_===v,onClick:async()=>{y(""),m(v);try{const c=await ea();c&&r([...n,v],ge(p,c))}catch(c){y(c?.message||"Failed to choose image from media library.")}finally{m(null)}}},_===v?"Choosing...":"Choose from media library"),e.default.createElement("input",{ref:c=>{c?w.current[v]=c:delete w.current[v]},type:"file",accept:"image/*",style:{display:"none"},onChange:async c=>{const L=c.target.files?.[0];if(c.target.value="",!!L){y(""),m(v);try{const M=await Ke(L);r([...n,v],ge(p,M))}catch(M){y(M?.message||"Failed to upload image.")}finally{m(null)}}}})):null))))),e.default.createElement("button",{className:"admin-repeatable__add",type:"button",disabled:s,onClick:()=>i(n,{text:""})},"+ Add an entry"),l?e.default.createElement("div",{className:"admin-media__error",style:{padding:"10px 16px 14px"}},l):null))}function Xa({definition:a,field:t,value:n,path:r,onChange:i,onAddItem:d,onRemoveItem:u,onMoveItem:s,disabled:f}){return Array.isArray(n)?e.default.createElement(Qa,{field:t,value:n,path:r,onChange:i,onAddItem:d,onRemoveItem:u,onMoveItem:s,disabled:f}):e.default.createElement(Va,{definition:a,field:t,value:n,path:r,onChange:i,disabled:f})}function Za(a,t){return a==="manualTag"?t?e.default.createElement("span",{className:"admin-list-status admin-list-status--manual"},t):null:a==="status"?e.default.createElement("span",{className:"admin-list-status"},t):(a==="featured"||a==="isFeatured"||a==="isPopular")&&(t==="Yes"||t==="No")?e.default.createElement("span",{className:`admin-list-boolean ${t==="Yes"?"admin-list-boolean--yes":"admin-list-boolean--no"}`},t==="Yes"?"\u2713":"\u2715"):t}function Ka({definition:a,records:t,controls:n,search:r,loading:i,onSearch:d,onOpenRecord:u,onCreate:s,onSetSort:f,onSetFilter:b,onResetFilters:g,onToggleDisplayedField:E,onResetDisplayedFields:S,onDuplicateRecord:h,onDeleteRecord:x}){const[_,m]=o.useState(!!r),[l,y]=o.useState(!1),[w,p]=o.useState(!1),[v,c]=o.useState(r),[L,M]=o.useState(null),F=o.useRef(null);o.useEffect(()=>{c(r)},[r]),o.useEffect(()=>{const k=window.setTimeout(()=>{v!==r&&d(v)},250);return()=>window.clearTimeout(k)},[d,r,v]),o.useEffect(()=>{const k=P=>{F.current&&!F.current.contains(P.target)&&M(null)};return document.addEventListener("mousedown",k),()=>document.removeEventListener("mousedown",k)},[]);const z=o.useMemo(()=>n.availableFields.filter(k=>n.displayedFields.includes(k.field)),[n.availableFields,n.displayedFields]),B=a.allowCreate!==!1,H=!!n.filters?.length,U=a.allowDuplicate!==!1,O=a.allowDelete!==!1;return e.default.createElement("div",{className:"admin-editor"},e.default.createElement("style",null,He),e.default.createElement("div",{className:"admin-editor__inner"},e.default.createElement("div",{className:"admin-header"},e.default.createElement("div",null,e.default.createElement("div",{className:"admin-meta"},a.metaLabel||"Collection Type"),e.default.createElement("h1",{className:"admin-title"},a.label)),e.default.createElement("div",{className:"admin-list-actions"},B?e.default.createElement("button",{className:"admin-primary",type:"button",onClick:s},"+ Create new entry"):null)),e.default.createElement("div",{className:"admin-list-meta"},t.length," entries found"),e.default.createElement("div",{className:"admin-list-toolbar"},e.default.createElement("div",{className:"admin-toolbar-cluster"},e.default.createElement("button",{className:`admin-toolbar-button admin-toolbar-button--icon${_?" admin-toolbar-button--active":""}`,type:"button",onClick:()=>m(k=>!k)},"\u{1F50D}"),_?e.default.createElement("input",{className:"admin-toolbar-search",value:v,onChange:k=>c(k.target.value),placeholder:"Search",autoFocus:!0}):null,H?e.default.createElement("button",{className:`admin-toolbar-button${l?" admin-toolbar-button--active":""}`,type:"button",onClick:()=>{y(k=>!k),p(!1)}},"Filters"):null,H&&l?e.default.createElement("div",{className:"admin-list-popover",style:{left:_?332:52,right:"auto"}},e.default.createElement("div",{className:"admin-list-popover__head"},e.default.createElement("div",{className:"admin-list-popover__title"},"Filters"),e.default.createElement("button",{className:"admin-list-popover__reset",type:"button",onClick:g},"Reset")),n.filters.map(k=>e.default.createElement("div",{key:k.field,className:"admin-list-popover__group"},e.default.createElement("label",{className:"admin-list-popover__label"},k.label),e.default.createElement("select",{className:"admin-list-popover__select",value:n.activeFilters[k.field]??"",onChange:P=>b(k.field,P.target.value)},e.default.createElement("option",{value:""},"All"),k.options.map(P=>e.default.createElement("option",{key:P,value:P},P)))))):null),e.default.createElement("div",{className:"admin-list-actions"},e.default.createElement("div",{className:"admin-toolbar-cluster"},e.default.createElement("button",{className:`admin-toolbar-button admin-toolbar-button--icon${w?" admin-toolbar-button--active":""}`,type:"button",onClick:()=>{p(k=>!k),y(!1)}},"\u2699"),w?e.default.createElement("div",{className:"admin-list-popover"},e.default.createElement("div",{className:"admin-list-popover__head"},e.default.createElement("div",{className:"admin-list-popover__title"},"Displayed fields"),e.default.createElement("button",{className:"admin-list-popover__reset",type:"button",onClick:S},"Reset")),n.availableFields.map(k=>e.default.createElement("label",{key:k.field,className:"admin-list-popover__check"},e.default.createElement("input",{type:"checkbox",checked:n.displayedFields.includes(k.field),onChange:P=>E(k.field,P.target.checked)}),e.default.createElement("span",null,k.label)))):null))),e.default.createElement("section",{className:"admin-list-card"},e.default.createElement("div",{className:"admin-list-card__head"},e.default.createElement("strong",null,a.label),e.default.createElement("span",null,i?"Loading...":`${t.length} entries`)),e.default.createElement("table",{className:"admin-list-table"},e.default.createElement("thead",null,e.default.createElement("tr",null,z.map(k=>e.default.createElement("th",{key:k.field},e.default.createElement("button",{type:"button",onClick:()=>f(k.field)},k.label,n.sortBy===k.field?` ${n.sortOrder==="asc"?"\u2191":"\u2193"}`:""))),e.default.createElement("th",null))),e.default.createElement("tbody",null,t.map(k=>e.default.createElement("tr",{key:k.documentId,onClick:()=>u(k.id)},z.map(P=>e.default.createElement("td",{key:`${k.documentId}-${P.field}`},Za(P.field,k.columns[P.field]))),e.default.createElement("td",{className:"admin-list-row-menu-cell"},e.default.createElement("button",{className:"admin-list-row-menu-trigger",type:"button",onClick:P=>{P.stopPropagation(),M(W=>W===k.id?null:k.id)}},"\u2026"),L===k.id?e.default.createElement("div",{ref:F,className:"admin-list-row-menu",onClick:P=>P.stopPropagation()},e.default.createElement("button",{className:"admin-list-row-menu__item",type:"button",onClick:()=>{M(null),u(k.id)}},e.default.createElement("span",{className:"admin-list-row-menu__icon"},"\u270E"),e.default.createElement("span",null,a.readOnly?"View":"Edit")),U?e.default.createElement("button",{className:"admin-list-row-menu__item",type:"button",onClick:()=>{M(null),h(k.id)}},e.default.createElement("span",{className:"admin-list-row-menu__icon"},"\u29C9"),e.default.createElement("span",null,"Duplicate")):null,O?e.default.createElement("button",{className:"admin-list-row-menu__item admin-list-row-menu__item--danger",type:"button",onClick:()=>{M(null),x(k.id)}},e.default.createElement("span",{className:"admin-list-row-menu__icon"},"\u{1F5D1}"),e.default.createElement("span",null,"Delete entry")):null):null))))))))}function et({definition:a,record:t,publishedRecord:n,activeTab:r,onSwitchTab:i,saving:d,error:u,onBack:s,onChange:f,onAddItem:b,onRemoveItem:g,onMoveItem:E,onSave:S,onPublish:h,onDelete:x,onDiscardChanges:_,onUnpublish:m,canSave:l,canPublish:y,canDiscard:w,canUnpublish:p,replyDraft:v,onReplyChange:c,onSendReply:L,sendingReply:M,isCreateMode:F}){const z=r==="published"&&n?n:t,B=r==="published"&&n,H=z?.entrySource==="manual"||z?.manualTag==="Manual",U=F||H||!a.readOnly,O=U&&a.showVersionTabs!==!1,k=U&&a.allowPublish!==!1,P=U&&a.allowSave!==!1,W=a.allowDelete!==!1,Y=F?Array.isArray(a.createFields)?a.createFields:[]:H?Array.isArray(a.manualEditableFields)?a.manualEditableFields:Array.isArray(a.editableFields)?a.editableFields:[]:Array.isArray(a.editableFields)?a.editableFields:[],K=!F&&Array.isArray(a.infoCardFields)?a.infoCardFields:[],J=!F&&Array.isArray(a.infoCardBlockFields)?a.infoCardBlockFields:[],ee=new Set([...K,...J].filter(V=>!Y.includes(V))),D=K.length===0&&J.length===0,I=F?Array.isArray(a.createLayout)?a.createLayout:a.editLayout:H&&Array.isArray(a.manualEditLayout)?a.manualEditLayout:a.editLayout,[T,R]=o.useState(!1),ae=o.useRef(null);return o.useEffect(()=>{if(!T)return;const V=Q=>{ae.current&&!ae.current.contains(Q.target)&&R(!1)};return document.addEventListener("mousedown",V),()=>{document.removeEventListener("mousedown",V)}},[T]),e.default.createElement("div",{className:"admin-editor"},e.default.createElement("style",null,He),e.default.createElement("div",{className:"admin-editor__inner"},e.default.createElement("button",{className:"admin-back",type:"button",onClick:s},"\u2190 Back"),D?e.default.createElement("div",{className:"admin-header"},e.default.createElement("div",null,e.default.createElement("div",{className:"admin-meta"},a.metaLabel||"Collection Type"),e.default.createElement("h1",{className:"admin-title"},Ua(a,z)),z.status?e.default.createElement("div",{className:"admin-status"},z.status):null)):null,O?e.default.createElement("div",{className:"admin-tabs"},e.default.createElement("button",{className:`admin-tab${r==="draft"?" admin-tab--active":""}`,type:"button",onClick:()=>i("draft")},"DRAFT"),e.default.createElement("button",{className:`admin-tab${r==="published"?" admin-tab--active":""}`,type:"button",onClick:()=>n&&i("published")},"PUBLISHED")):null,u?e.default.createElement(A.MessageBox,{variant:"danger"},u):null,e.default.createElement("div",{className:"admin-layout"},e.default.createElement("div",{className:"admin-main-card"},e.default.createElement(Ga,{definition:a,record:z}),a.name==="messages"?e.default.createElement(Ya,{replies:Array.isArray(z?.replies)?z.replies:[],replyDraft:v,onReplyChange:c,onSendReply:L,sendingReply:M}):null,I.map((V,Q)=>{const q=V.filter(X=>!ee.has(X));return q.length?e.default.createElement("div",{key:`row-${Q}`,className:"admin-section"},e.default.createElement("div",{className:"admin-field-grid"},q.map(X=>{const _e=B||!U||Y.length>0&&!Y.includes(X);return e.default.createElement(Xa,{definition:a,key:X,field:X,value:z[X],path:[X],onChange:f,onAddItem:b,onRemoveItem:g,onMoveItem:E,disabled:_e})}))):null})),e.default.createElement("aside",null,U?e.default.createElement(e.default.Fragment,null,e.default.createElement("div",{className:"admin-side-card"},e.default.createElement("div",{className:"admin-side-card__head"},"Entry"),e.default.createElement("div",{className:"admin-side-card__body"},k?e.default.createElement(e.default.Fragment,null,e.default.createElement("div",{className:"admin-side-button-row"},e.default.createElement("button",{className:"admin-side-button--secondary",type:"button",onClick:h,disabled:!y},"Publish"),e.default.createElement("button",{className:"admin-side-button--secondary admin-side-button--menu",type:"button",onClick:()=>R(V=>!V)},"\u2026"),T?e.default.createElement("div",{ref:ae,className:"admin-side-action-menu"},e.default.createElement("button",{className:"admin-side-action-menu__item admin-side-action-menu__item--danger",type:"button",onClick:()=>{R(!1),m()},disabled:!p},e.default.createElement("span",{className:"admin-side-action-menu__icon"},"\xD7"),"Unpublish"),e.default.createElement("button",{className:"admin-side-action-menu__item admin-side-action-menu__item--danger",type:"button",onClick:()=>{R(!1),_()},disabled:!w},e.default.createElement("span",{className:"admin-side-action-menu__icon"},"\xD7"),"Discard changes")):null),P?e.default.createElement("button",{className:"admin-side-button",type:"button",onClick:S,disabled:!l},d?"Saving...":"Save"):null):P?e.default.createElement("button",{className:"admin-side-button",type:"button",onClick:S,disabled:!l},d?"Saving...":"Save"):e.default.createElement("div",{className:"admin-side-note"},"No editable actions for this record."))),W?e.default.createElement("div",{className:"admin-side-card"},e.default.createElement("div",{className:"admin-side-card__head"},"Actions"),e.default.createElement("div",{className:"admin-side-card__body"},e.default.createElement("button",{className:"admin-side-button--secondary",type:"button",onClick:x,disabled:B},"Delete"))):null):e.default.createElement("div",{className:"admin-side-card"},e.default.createElement("div",{className:"admin-side-card__head"},"Entry"),e.default.createElement("div",{className:"admin-side-card__body"},e.default.createElement("div",{className:"admin-side-note"},"Read-only record.")))))))}function at(){const{pageName:a}=G.useParams(),t=G.useLocation(),n=G.useNavigate(),r=ue.useNotice(),[i,d]=o.useState(!0),[u,s]=o.useState(!1),[f,b]=o.useState(!1),[g,E]=o.useState(null),[S,h]=o.useState([]),[x,_]=o.useState(null),[m,l]=o.useState(null),[y,w]=o.useState(null),[p,v]=o.useState(null),[c,L]=o.useState("draft"),[M,F]=o.useState(""),[z,B]=o.useState({subject:"",body:""}),[H,U]=o.useState(!1),O=o.useMemo(()=>new URLSearchParams(t.search),[t.search]),k=O.get("recordId"),P=O.get("new")==="1",W=O.get("search")||"",Y=O.get("status")||"",K=O.get("category")||"",J=O.get("planType")||"",ee=O.get("featured")||"",D=O.get("isFeatured")||"",I=O.get("isPopular")||"",T=O.get("sortBy")||"",R=O.get("sortOrder")||"",ae=Oa(O.get("displayedFields")),V=m?.entrySource==="manual"||p?.entrySource==="manual",Q=!!g&&(!g.readOnly||P||V),q=o.useMemo(()=>k||P?"edit":"list",[k,P]),X=o.useMemo(()=>JSON.stringify(ne(m))!==JSON.stringify(ne(y)),[m,y]),_e=o.useMemo(()=>ke(m),[m]),Jt=o.useMemo(()=>JSON.stringify(ne(m))!==JSON.stringify(ne(p)),[m,p]),ga=g?.showVersionTabs!==!1,Vt=Q&&q==="edit"&&!f&&(!ga||c!=="published")&&X,Gt=Q&&q==="edit"&&!f&&ga&&c!=="published"&&(p?Jt:_e),Yt=Q&&q==="edit"&&!f&&c!=="published"&&_e,Qt=Q&&q==="edit"&&!f&&!!p;o.useEffect(()=>{let N=!0;return(async()=>{q==="edit"||!g?d(!0):s(!0),F("");try{const j=await be(a,{query:q==="edit"?k?{recordId:k}:{new:"1"}:{search:W,status:Y,category:K,planType:J,featured:ee,isFeatured:D,isPopular:I,sortBy:T,sortOrder:R,displayedFields:ae.join(",")}});if(!N)return;E(j.definition),h(j.records??[]),_(j.controls??null);const le=j.draftRecord?Z(j.draftRecord):null;l(le),w(le?Z(le):null),v(j.publishedRecord?Z(j.publishedRecord):null),L("draft"),B(Me=>a==="messages"&&le?{subject:Me.subject||"Re: Your message to The Leadenhall Works",body:Me.body}:Me)}catch(j){if(!N)return;F(j.message)}finally{N&&(d(!1),s(!1))}})(),()=>{N=!1}},[q,a,k,P,W,Y,K,J,ee,D,I,T,R,ae.join(",")]),o.useEffect(()=>{a!=="messages"||!m||B(N=>({subject:N.subject||"Re: Your message to The Leadenhall Works",body:N.body}))},[a,m]);const de=N=>{const C={search:W,status:Y,category:K,planType:J,featured:ee,isFeatured:D,isPopular:I,sortBy:T,sortOrder:R,displayedFields:ae.join(","),...N};n(se(t.pathname,C))},Xt=(N,C)=>{l($=>Ve($,N,C))},Zt=(N,C)=>{l($=>Ye($,N,C))},Kt=N=>{l(C=>Ge(C,N))},en=(N,C)=>{l($=>Qe($,N,C))},ye=async N=>{if(!(!m||!Q)){b(!0),F("");try{const C=await be(a,{method:"POST",body:{intent:N,recordId:m.id??null,record:m,new:P?"1":void 0}});if(C.draftRecord){const $=Z(C.draftRecord);l($),w(Z($))}v(C.publishedRecord?Z(C.publishedRecord):null),N==="unpublish"&&L("draft"),!k&&C.draftRecord?.id&&n(se(t.pathname,{recordId:C.draftRecord.id})),C.notice&&r({message:C.notice.message,type:C.notice.type}),C.deleted&&n(`/admin/pages/${a}`)}catch(C){F(C.message),r({message:C.message,type:"error"})}finally{b(!1)}}},an=()=>{l(Je(m)),L("draft")},tn=async()=>{g?.allowCreate!==!1&&n(se(t.pathname,{new:1}))},ba=async(N,C)=>{try{const $=await be(a,{method:"POST",body:{intent:N,recordId:C}});if(r({message:$.notice?.message??`${g.label} updated.`,type:$.notice?.type??"success"}),N==="duplicate"&&$.draftRecord?.id){n(se(t.pathname,{recordId:$.draftRecord.id}));return}N==="delete"&&h(j=>j.filter(le=>le.id!==C))}catch($){F($.message),r({message:$.message,type:"error"})}},nn=(N,C)=>{B($=>({...$,[N]:C}))},rn=async()=>{if(!(a!=="messages"||!k)){U(!0),F("");try{const N=await be(a,{method:"POST",body:{intent:"sendReply",recordId:k,reply:z}});if(N.draftRecord){const C=Z(N.draftRecord);l(C),w(Z(C))}N.notice&&r({message:N.notice.message,type:N.notice.type}),B({subject:z.subject||"Re: Your message to The Leadenhall Works",body:""})}catch(N){F(N.message),r({message:N.message,type:"error"})}finally{U(!1)}}};return i?e.default.createElement("div",{style:{display:"flex",justifyContent:"center",alignItems:"center",height:"100%"}},e.default.createElement(A.Loader,null)):g?q==="list"?e.default.createElement(Ka,{definition:g,records:S,controls:x??{displayedFields:g.listColumns.map(N=>N.field),availableFields:g.listColumns,filters:[],activeFilters:{},sortBy:"",sortOrder:"desc"},search:W,loading:u,onSearch:N=>de({search:N}),onOpenRecord:N=>n(se(t.pathname,{recordId:N})),onCreate:tn,onSetSort:N=>{const C=x?.sortBy===N&&x?.sortOrder==="asc"?"desc":"asc";de({sortBy:N,sortOrder:C})},onSetFilter:(N,C)=>de({[N]:C}),onResetFilters:()=>de({status:"",category:"",planType:"",featured:"",isFeatured:"",isPopular:""}),onToggleDisplayedField:(N,C)=>{const $=C?[...new Set([...x?.displayedFields??[],N])]:(x?.displayedFields??[]).filter(j=>j!==N);de({displayedFields:$.join(",")})},onResetDisplayedFields:()=>de({displayedFields:g.listColumns.map(N=>N.field).join(",")}),onDuplicateRecord:N=>ba("duplicate",N),onDeleteRecord:N=>ba("delete",N)}):m?e.default.createElement(et,{definition:g,record:m,publishedRecord:p,activeTab:c,onSwitchTab:L,saving:f,error:M,onBack:()=>n(`/admin/pages/${a}`),onChange:Xt,onAddItem:Zt,onRemoveItem:Kt,onMoveItem:en,onSave:()=>ye("save"),onPublish:()=>ye("publish"),onDelete:()=>ye("delete"),onDiscardChanges:an,onUnpublish:()=>ye("unpublish"),canSave:Vt,canPublish:Gt,canDiscard:Yt,canUnpublish:Qt,replyDraft:z,onReplyChange:nn,onSendReply:rn,sendingReply:H,isCreateMode:P}):e.default.createElement("div",{style:{display:"flex",justifyContent:"center",alignItems:"center",height:"100%"}},e.default.createElement(A.Loader,null)):e.default.createElement(A.MessageBox,{variant:"danger"},"Collection definition missing.")}const aa=new ue.ApiClient,tt=/(description|content|message|body|subtitle|excerpt|intro|hours|address|text|paragraph|overview|challenge|result)/i,nt=/(image|background|logo|thumbnail|featured)/i,rt=/(^path$|Path$)/,it=/(description|content|message|body|subtitle|excerpt|intro|overview|challenge|result|background|image|gallery|sections|testimonials|services|whyChooseItems|featureChips|socialLinks|faqItems|comparisonRows|comparisonColumns|storyParagraphs|relatedWorkspaces|challengeItems|amenities|navigation|footer|form)/i,dt=/(heroTitle|heroSubtitle|storyTitle|whyChooseTitle|amenitiesTitle|title)$/i,lt=[{value:"/",label:"Home"},{value:"/pricing",label:"Pricing"},{value:"/meeting-rooms",label:"Meeting Rooms"},{value:"/virtual-office",label:"Virtual Office"},{value:"/about",label:"About"},{value:"/contact",label:"Contact"},{value:"/faq",label:"FAQ"},{value:"/blog",label:"Blog"},{value:"/privacy",label:"Privacy Policy"},{value:"/terms",label:"Terms"},{value:"/dashboard",label:"Dashboard"}],st={"site-settings":[{fields:["siteName","tagline"]},{fields:["contactEmail","contactPhone","address"]},{fields:["defaultSeoTitle","defaultSeoDescription"]},{fields:["navigation"]},{fields:["footer"]},{fields:["socialLinks"]}],homepage:[{fields:["hero","featureChips"]},{fields:["servicesEyebrow","servicesKicker","services"]},{fields:["aboutHighlight"]},{fields:["whyChooseEyebrow","whyChooseKicker","whyChooseTitle","whyChooseItems"]},{fields:["testimonialsEyebrow","testimonialsKicker","testimonialsTitle","testimonials"]},{fields:["galleryEyebrow","galleryKicker","galleryTitle","galleryImages"]},{fields:["contactForm"]},{fields:["visitUsTitle","addressLabel","emailLabel","phoneLabel","openHoursLabel","weekdayHours","weekendHours","mapButtonLabel"]}],"about-page":[{fields:["heroTitle","heroSubtitle","heroBackgroundImage"]},{fields:["storyTitle","storyParagraphs","storyImage"]},{fields:["whyChooseTitle","whyChooseItems"]},{fields:["amenitiesTitle","amenitiesImage","amenities"]}],"blog-page":[{fields:["heroTitle","heroSubtitle","heroBackgroundImage"]},{fields:["searchPlaceholder","quickSearchTitle","recentPostsTitle","categoriesTitle","popularTagsTitle","noResultsText"]},{fields:["detailBackLabel","detailSearchTitle","detailSearchButtonLabel","detailPopularTagsTitle","detailRecentPostsTitle","detailRelatedWorkspacesTitle"]},{fields:["detailCommentForm"]},{fields:["relatedWorkspaces"]}],"pricing-page":[{fields:["heroTitle","heroSubtitle","heroBackgroundImage"]},{fields:["comparisonTitle","featureListTitle","featureListSubtitle","comparisonColumns","comparisonRows","recommendedLabel","purchaseButtonLabel"]},{fields:["faqTitle","faqSubtitle","faqItems"]}],"faq-page":[{fields:["eyebrow","heroTitle","heroSubtitle","heroBackgroundImage","title","description"]},{fields:["searchPlaceholder","noResultsText"]},{fields:["ctaTitle","ctaDescription","ctaButtonLabel"]}],"meeting-rooms-page":[{fields:["heroTitle","heroSubtitle","heroBackgroundImage"]},{fields:["roomsTitle","roomsSubtitle","bookNowLabel","readMoreLabel","popularLabel"]},{fields:["plansTitle","plansSubtitle","getStartedLabel"]},{fields:["amenitiesTitle","amenitiesSubtitle","amenities"]}],"virtual-office-page":[{fields:["heroTitle","heroSubtitle","heroBackgroundImage"]},{fields:["overviewTitle","overviewText","featuredImage","galleryImages"]},{fields:["challengeTitle","challengeIntro","challengeItems"]},{fields:["resultTitle","resultText"]},{fields:["ctaTitle","ctaDescription","ctaButtonLabel"]},{fields:["projectInfoTitle","projectDateLabel","projectDateValue","projectWebsiteLabel","projectWebsiteValue","projectCategoryLabel","projectCategoryValue"]},{fields:["contactForm"]}],"contact-page":[{fields:["heroTitle","heroSubtitle","heroBackgroundImage"]},{fields:["introEyebrow","introTitle"]},{fields:["addressCardTitle","phoneCardTitle","emailCardTitle"]},{fields:["form"]},{fields:["mapTitle","mapDescription"]}],"privacy-policy-page":[{fields:["heroTitle","heroSubtitle"]},{fields:["effectiveDateLabel","effectiveDateValue","introText"]},{fields:["sections"]},{fields:["contactTitle","contactBody","contactButtonLabel"]}],"terms-page":[{fields:["heroTitle","heroSubtitle"]},{fields:["effectiveDateLabel","effectiveDateValue","introText"]},{fields:["sections"]},{fields:["contactTitle","contactBody","contactButtonLabel"]}]},ot=`
.admin-editor {
  min-height: 100%;
  padding: 32px 40px 64px 40px;
  background: #f6f6f9;
  color: #32324d;
}

.admin-editor__inner {
  max-width: 1240px;
  margin: 0 auto;
}

.admin-back {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  border: 0;
  background: transparent;
  color: #4945ff;
  font-size: 0.875rem;
  line-height: 1.25rem;
  cursor: pointer;
  padding: 0;
  margin-bottom: 14px;
}

.admin-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 24px;
  margin-bottom: 12px;
}

.admin-meta {
  font-size: 0.75rem;
  line-height: 1rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  color: #666687;
  margin-bottom: 4px;
}

.admin-title {
  margin: 0;
  font-size: 2.25rem;
  line-height: 2.75rem;
  font-weight: 700;
  color: #32324d;
}

.admin-status {
  display: inline-flex;
  align-items: center;
  min-height: 2rem;
  padding: 0 0.75rem;
  margin-top: 14px;
  border: 1px solid #c6f0c2;
  border-radius: 4px;
  background: #efffed;
  color: #2f6846;
  font-size: 0.8125rem;
  line-height: 1rem;
  font-weight: 600;
}

.admin-kebab {
  width: 2rem;
  height: 2rem;
  border: 1px solid #dcdce4;
  border-radius: 4px;
  background: #ffffff;
  color: #666687;
  font-size: 1rem;
  line-height: 1;
  cursor: pointer;
}

.admin-tabs {
  display: flex;
  align-items: center;
  gap: 24px;
  margin-bottom: 24px;
  border-bottom: 1px solid #eaeaef;
}

.admin-tab {
  position: relative;
  border: 0;
  background: transparent;
  padding: 0 0 12px;
  color: #666687;
  font-size: 0.75rem;
  line-height: 1rem;
  font-weight: 700;
  cursor: pointer;
}

.admin-tab--active {
  color: #4945ff;
}

.admin-tab--active::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: -1px;
  height: 2px;
  background: #4945ff;
}

.admin-layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 232px;
  gap: 16px;
  align-items: start;
}

.admin-main-card,
.admin-side-card {
  border: 1px solid #dcdce4;
  border-radius: 4px;
  background: #ffffff;
  box-shadow: 0 1px 2px rgba(33, 33, 52, 0.06);
}

.admin-main-card {
  padding: 24px;
}

.admin-section + .admin-section {
  margin-top: 20px;
}

.admin-field-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 20px 24px;
}

.admin-field {
  min-width: 0;
}

.admin-field--full {
  grid-column: 1 / -1;
}

.admin-label {
  display: inline-flex;
  align-items: center;
  gap: 2px;
  margin-bottom: 6px;
  color: #32324d;
  font-size: 0.75rem;
  line-height: 1rem;
  font-weight: 600;
}

.admin-label__required {
  color: #d02b20;
}

.admin-input,
.admin-textarea {
  width: 100%;
  box-sizing: border-box;
  border: 1px solid #dcdce4;
  border-radius: 4px;
  background: #ffffff;
  color: #32324d;
  padding: 0.625rem 0.875rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
  outline: none;
}

.admin-input {
  min-height: 2.5rem;
}

.admin-input:focus,
.admin-textarea:focus {
  border-color: #4945ff;
  box-shadow: 0 0 0 1px #4945ff;
}

.admin-input:disabled,
.admin-textarea:disabled {
  background: #f6f6f9;
  color: #666687;
  cursor: not-allowed;
}

.admin-textarea {
  min-height: 5.75rem;
  resize: vertical;
}

.admin-media {
  border: 1px solid #dcdce4;
  border-radius: 4px;
  background: #ffffff;
  padding: 16px;
}

.admin-media__canvas {
  min-height: 140px;
  border: 1px solid #dcdce4;
  border-radius: 4px;
  background: #fafafb;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
}

.admin-media__empty {
  color: #8e8ea9;
  font-size: 0.8125rem;
}

.admin-media__stack {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.admin-media__thumb {
  max-width: 240px;
  max-height: 140px;
  object-fit: cover;
  border-radius: 2px;
}

.admin-media__actions {
  display: flex;
  align-items: center;
  gap: 4px;
}

.admin-media__action {
  width: 2rem;
  height: 2rem;
  border: 1px solid #dcdce4;
  border-radius: 4px;
  background: #ffffff;
  color: #666687;
  cursor: pointer;
}

.admin-media__action:disabled {
  background: #f6f6f9;
  color: #8e8ea9;
  cursor: not-allowed;
}

.admin-media__filename {
  max-width: 280px;
  color: #666687;
  font-size: 0.75rem;
  line-height: 1rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.admin-media__source {
  margin-top: 10px;
}

.admin-media__source-actions {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 8px;
}

.admin-media__upload-button {
  min-height: 2rem;
  padding: 0 0.75rem;
  border: 1px solid #dcdce4;
  border-radius: 4px;
  background: #ffffff;
  color: #32324d;
  font-size: 0.75rem;
  font-weight: 600;
  cursor: pointer;
}

.admin-media__upload-button:disabled {
  background: #f6f6f9;
  color: #8e8ea9;
  cursor: not-allowed;
}

.admin-media__error {
  color: #d02b20;
  font-size: 0.75rem;
  line-height: 1rem;
}

.admin-object {
  border: 1px solid #dcdce4;
  border-radius: 4px;
  padding: 16px;
}

.admin-object__title {
  margin: 0 0 12px;
  font-size: 0.8125rem;
  line-height: 1rem;
  font-weight: 700;
  color: #666687;
  text-transform: uppercase;
}

.admin-repeatable {
  border: 1px solid #dcdce4;
  border-radius: 4px;
  overflow: hidden;
  background: #ffffff;
}

.admin-repeatable__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 12px 16px 10px;
  border-bottom: 1px solid #f0f0f5;
}

.admin-repeatable__title {
  font-size: 0.75rem;
  line-height: 1rem;
  font-weight: 600;
  color: #32324d;
}

.admin-repeatable__count {
  color: #8e8ea9;
  font-size: 0.75rem;
}

.admin-repeatable__item + .admin-repeatable__item {
  border-top: 1px solid #f0f0f5;
}

.admin-repeatable__item--drag-over summary {
  background: #f0f0ff;
}

.admin-repeatable__item[open] summary {
  background: #fafafb;
}

.admin-repeatable__summary {
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 12px 16px;
  cursor: pointer;
}

.admin-repeatable__summary::-webkit-details-marker {
  display: none;
}

.admin-repeatable__summary-left {
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 0;
}

.admin-repeatable__bullet {
  width: 20px;
  height: 20px;
  border-radius: 999px;
  background: #f0f0f5;
  color: #666687;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 0.625rem;
}

.admin-repeatable__name {
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: 600;
  color: #32324d;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.admin-repeatable__actions {
  display: flex;
  align-items: center;
  gap: 10px;
  color: #8e8ea9;
  font-size: 0.875rem;
}

.admin-repeatable__icon-button {
  border: 0;
  background: transparent;
  color: inherit;
  cursor: pointer;
  padding: 0;
}

.admin-repeatable__drag-handle {
  border: 0;
  background: transparent;
  color: #8e8ea9;
  cursor: grab;
  padding: 0 2px;
  font-size: 1rem;
  line-height: 1;
}

.admin-repeatable__drag-handle:active {
  cursor: grabbing;
}

.admin-repeatable__drag-handle:disabled {
  color: #c4c4d2;
  cursor: not-allowed;
}

.admin-repeatable__icon-button:disabled,
.admin-repeatable__add:disabled,
.admin-side-button:disabled,
.admin-side-button--secondary:disabled {
  cursor: not-allowed;
  opacity: 1;
}

.admin-repeatable__icon-button:disabled,
.admin-repeatable__add:disabled {
  color: #8e8ea9;
}

.admin-repeatable__body {
  padding: 16px;
  background: #ffffff;
}

.admin-repeatable__add {
  width: 100%;
  border: 0;
  border-top: 1px solid #f0f0f5;
  background: #ffffff;
  color: #4945ff;
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: 600;
  padding: 14px 16px;
  cursor: pointer;
}

.admin-switch {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  min-height: 2.5rem;
  border: 1px solid #dcdce4;
  border-radius: 4px;
  padding: 0.625rem 0.875rem;
}

.admin-switch input {
  accent-color: #4945ff;
}

.admin-switch:has(input:disabled) {
  background: #f6f6f9;
  color: #666687;
}

.admin-side-card + .admin-side-card {
  margin-top: 12px;
}

.admin-side-card__head {
  padding: 14px 16px 8px;
  color: #666687;
  font-size: 0.75rem;
  line-height: 1rem;
  font-weight: 700;
  text-transform: uppercase;
}

.admin-side-card__body {
  padding: 0 12px 12px;
}

.admin-side-button-row {
  display: flex;
  gap: 8px;
  margin-bottom: 8px;
  position: relative;
}

.admin-side-button,
.admin-side-button--secondary {
  width: 100%;
  min-height: 2.25rem;
  border-radius: 4px;
  font-size: 0.8125rem;
  line-height: 1rem;
  font-weight: 600;
  cursor: pointer;
}

.admin-side-button {
  border: 1px solid #4945ff;
  background: #4945ff;
  color: #ffffff;
}

.admin-side-button--secondary {
  border: 1px solid #dcdce4;
  background: #ffffff;
  color: #32324d;
}

.admin-side-button:disabled,
.admin-side-button--secondary:disabled {
  border-color: #dcdce4;
  background: #f6f6f9;
  color: #8e8ea9;
}

.admin-side-button--menu {
  width: 2rem;
  flex: 0 0 2rem;
}

.admin-side-action-menu {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  width: 220px;
  border: 1px solid #dcdce4;
  border-radius: 4px;
  background: #ffffff;
  box-shadow: 0 12px 32px rgba(33, 33, 52, 0.12);
  padding: 8px 0;
  z-index: 40;
}

.admin-side-action-menu__item {
  width: 100%;
  border: 0;
  background: transparent;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  color: #32324d;
  font-size: 0.875rem;
  line-height: 1.25rem;
  cursor: pointer;
  text-align: left;
}

.admin-side-action-menu__item:hover {
  background: #f6f6f9;
}

.admin-side-action-menu__item--danger {
  color: #d02b20;
}

.admin-side-action-menu__item:disabled {
  background: transparent;
  color: #8e8ea9;
  cursor: not-allowed;
}

.admin-side-action-menu__icon {
  width: 18px;
  color: inherit;
  text-align: center;
}

@media (max-width: 1180px) {
  .admin-layout {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 960px) {
  .admin-editor {
    padding: 20px 16px 48px;
  }

  .admin-field-grid {
    grid-template-columns: 1fr;
  }
}
`;function oe(a){return a.replace(/([a-z0-9])([A-Z])/g,"$1 $2").replace(/[_-]+/g," ").replace(/\bseo\b/gi,"SEO").replace(/\bcta\b/gi,"CTA").replace(/\bfaq\b/gi,"FAQ").replace(/\bid\b/gi,"ID").replace(/\burl\b/gi,"URL").replace(/\s+/g," ").trim().replace(/^./,t=>t.toUpperCase())}function mt(a){return a==="path"?"Destination":a.endsWith("Path")?oe(a.replace(/Path$/,"Destination")):oe(a)}function ct(a){const t=[...lt];return a&&!t.some(n=>n.value===a)&&t.unshift({value:a,label:"Current destination"}),t}function re(a){return JSON.parse(JSON.stringify(a))}function ie(a){return Array.isArray(a)?a.map(t=>ie(t)):me(a)?Object.keys(a).sort().filter(t=>t!=="__tempId").reduce((t,n)=>(t[n]=ie(a[n]),t),{}):a}function Pe(a){return Array.isArray(a)?a.some(t=>Pe(t)):me(a)?Object.entries(a).filter(([t])=>t!=="__tempId").some(([,t])=>Pe(t)):typeof a=="string"?a.trim().length>0:typeof a=="number"?a!==0:typeof a=="boolean"?a:a!=null}function me(a){return a!==null&&typeof a=="object"&&!Array.isArray(a)}function ut(a){if(typeof a!="string")return"";try{return new URL(a).pathname.split("/").pop()||a}catch{return a.split("/").pop()||a}}function De(a){return Array.isArray(a)?[]:a&&typeof a=="object"?Object.fromEntries(Object.keys(a).filter(t=>t!=="id").map(t=>[t,De(a[t])])):typeof a=="boolean"?!1:typeof a=="number"?0:""}function ta(a,t,n){if(!t.length)return n;const[r,...i]=t,d=Array.isArray(a)?[...a]:{...a};return d[r]=ta(a?.[r],i,n),d}function na(a,t){if(t.length===1)return Array.isArray(a)?a.filter((d,u)=>u!==t[0]):a;const[n,...r]=t,i=Array.isArray(a)?[...a]:{...a};return i[n]=na(a?.[n],r),i}function ra(a,t,n){if(!t.length)return[...Array.isArray(a)?a:[],n];const[r,...i]=t,d=Array.isArray(a)?[...a]:{...a};return d[r]=ra(a?.[r],i,n),d}function ia(a,t,n){if(t.length===1){if(!Array.isArray(a))return a;const u=t[0],s=u+n;if(s<0||s>=a.length)return a;const f=[...a],[b]=f.splice(u,1);return f.splice(s,0,b),f}const[r,...i]=t,d=Array.isArray(a)?[...a]:{...a};return d[r]=ia(a?.[r],i,n),d}function da(a,t){if(typeof t=="number"){if(a==="")return 0;const n=Number(a);return Number.isNaN(n)?t:n}return a}function ft(a){if(typeof a!="string")return"";const t=a.trim();return t?/^https?:\/\//i.test(t)||t.startsWith("data:image/")||t.startsWith("/")?t:`/${t.replace(/^\.?\//,"")}`:""}function la(a,t){const n=a?.response?.data;return typeof n?.message=="string"&&n.message.trim()?n.message:typeof n?.error=="string"&&n.error.trim()?n.error:typeof a?.message=="string"&&a.message.trim()?a.message:t}async function pt(a){const t=new FormData;t.append("file",a);const n=await fetch("/admin/api/media/upload",{method:"POST",body:t,credentials:"same-origin"}),r=await n.json().catch(()=>({}));if(!n.ok)throw new Error(r.error||"Failed to upload image.");const i=r?.url||r?.item?.relativeUrl||r?.item?.url;if(!i)throw new Error("Upload succeeded but returned no URL.");return i}const gt="adminjs-media-select";function bt(){return new Promise((a,t)=>{if(typeof window>"u"){a("");return}const n=window.open("/admin/pages/media-library?picker=1","admin-media-library-picker","popup=yes,width=1440,height=900,resizable=yes,scrollbars=yes");if(!n){t(new Error("Media library popup was blocked."));return}let r=!1;const i=()=>{window.removeEventListener("message",d),window.clearInterval(u)},d=s=>{s.origin!==window.location.origin||s.source!==n||s.data?.type===gt&&(r=!0,i(),a(typeof s.data.url=="string"?s.data.url:""))},u=window.setInterval(()=>{n.closed&&!r&&(i(),a(""))},500);window.addEventListener("message",d)})}function ht(a){return dt.test(a)}function sa(a,t){return it.test(a)||typeof t=="boolean"?"admin-field admin-field--full":"admin-field"}function Te(a){return String(a).toLowerCase()==="icon"}function _t(a,t,n){return me(a)?[a.title,a.name,a.label,a.question,a.feature,a.path,a.href,a.alt].find(i=>typeof i=="string"&&i.trim())||`${t} ${n+1}`:`${t} ${n+1}`}function yt(a,t){const n=Object.entries(t??{}),r=st[a];if(!r)return[{entries:n}];const i=new Set,d=r.map(s=>{const f=s.fields.filter(b=>Object.prototype.hasOwnProperty.call(t??{},b)).map(b=>(i.add(b),[b,t[b]]));return{...s,entries:f}}).filter(s=>s.entries.length>0),u=n.filter(([s])=>!i.has(s));return u.length&&d.push({entries:u}),d}function oa({fieldKey:a,value:t,path:n,onChange:r,disabled:i}){const d=mt(a),u=t??"",s=ht(a),f=typeof u=="string"&&nt.test(a),b=typeof u=="string"&&rt.test(a),g=f?ft(u):"",E=!!g,S=o.useRef(null),[h,x]=o.useState(!1),[_,m]=o.useState("");return typeof t=="boolean"?e.default.createElement("div",{className:sa(a,t)},e.default.createElement("label",{className:"admin-label"},d,s?e.default.createElement("span",{className:"admin-label__required"},"*"):null),e.default.createElement("div",{className:"admin-switch"},e.default.createElement("span",null,t?"Enabled":"Disabled"),e.default.createElement("input",{type:"checkbox",checked:t,disabled:i,onChange:l=>r(n,l.target.checked)}))):f?e.default.createElement("div",{className:"admin-field admin-field--full"},e.default.createElement("label",{className:"admin-label"},d,s?e.default.createElement("span",{className:"admin-label__required"},"*"):null),e.default.createElement("div",{className:"admin-media"},e.default.createElement("div",{className:"admin-media__canvas"},E?e.default.createElement("div",{className:"admin-media__stack"},e.default.createElement("img",{className:"admin-media__thumb",src:g,alt:d}),e.default.createElement("div",{className:"admin-media__actions"},e.default.createElement("button",{className:"admin-media__action",type:"button",disabled:i,onClick:()=>window.open(g,"_blank","noopener,noreferrer")},"\u2197"),e.default.createElement("button",{className:"admin-media__action",type:"button",disabled:i,onClick:()=>r(n,"")},"\u2715")),e.default.createElement("div",{className:"admin-media__filename"},ut(u))):e.default.createElement("div",{className:"admin-media__empty"},"Upload an image to attach media.")),e.default.createElement("div",{className:"admin-media__source"},e.default.createElement("div",{className:"admin-media__source-actions"},e.default.createElement("button",{className:"admin-media__upload-button",type:"button",disabled:i||h,onClick:()=>S.current?.click()},h?"Uploading...":"Upload from computer"),e.default.createElement("button",{className:"admin-media__upload-button",type:"button",disabled:i||h,onClick:async()=>{m("");try{const l=await bt();l&&r(n,l)}catch(l){m(l?.message||"Failed to choose image from media library.")}}},"Choose from media library"),e.default.createElement("input",{ref:S,type:"file",accept:"image/*",style:{display:"none"},onChange:async l=>{const y=l.target.files?.[0];if(l.target.value="",!!y){m(""),x(!0);try{const w=await pt(y);r(n,w)}catch(w){m(w?.message||"Failed to upload image.")}finally{x(!1)}}}})),_?e.default.createElement("div",{className:"admin-media__error"},_):null))):e.default.createElement("div",{className:sa(a,t)},e.default.createElement("label",{className:"admin-label"},d,s?e.default.createElement("span",{className:"admin-label__required"},"*"):null),b?e.default.createElement("select",{className:"admin-input",value:u,disabled:i,onChange:l=>r(n,l.target.value)},e.default.createElement("option",{value:""},"Select destination"),ct(u).map(l=>e.default.createElement("option",{key:l.value||"empty",value:l.value},l.label))):tt.test(a)?e.default.createElement("textarea",{className:"admin-textarea",value:u,disabled:i,onChange:l=>r(n,da(l.target.value,t))}):e.default.createElement("input",{className:"admin-input",type:typeof t=="number"?"number":"text",value:u,disabled:i,onChange:l=>r(n,da(l.target.value,t))}))}function xt({fieldKey:a,value:t,path:n,onChange:r,onAddItem:i,onRemoveItem:d,onMoveItem:u,disabled:s}){const f=Object.entries(t??{}).filter(([b])=>b!=="id"&&!Te(b));return e.default.createElement("div",{className:"admin-field admin-field--full"},e.default.createElement("div",{className:"admin-object"},e.default.createElement("h4",{className:"admin-object__title"},oe(a)),e.default.createElement("div",{className:"admin-field-grid"},f.map(([b,g])=>e.default.createElement(Ie,{key:`${a}-${b}`,fieldKey:b,value:g,path:[...n,b],onChange:r,onAddItem:i,onRemoveItem:d,onMoveItem:u,disabled:s})))))}function Et({fieldKey:a,value:t,path:n,onChange:r,onAddItem:i,onRemoveItem:d,onMoveItem:u,disabled:s}){const f=oe(a),b=t[0]??"",[g,E]=o.useState(null),[S,h]=o.useState(null);return e.default.createElement("div",{className:"admin-field admin-field--full"},e.default.createElement("label",{className:"admin-label"},f),e.default.createElement("div",{className:"admin-repeatable"},e.default.createElement("div",{className:"admin-repeatable__head"},e.default.createElement("div",null,e.default.createElement("div",{className:"admin-repeatable__title"},f),e.default.createElement("div",{className:"admin-repeatable__count"},t.length," entry",t.length===1?"":"ies"))),t.map((x,_)=>e.default.createElement("details",{key:`${a}-${_}`,className:`admin-repeatable__item${S===_?" admin-repeatable__item--drag-over":""}`,open:_===0,onDragOver:m=>{s||g===null||(m.preventDefault(),S!==_&&h(_))},onDrop:m=>{if(s||g===null)return;m.preventDefault();const l=_-g;l!==0&&u([...n,g],l),E(null),h(null)},onDragLeave:()=>{S===_&&h(null)}},e.default.createElement("summary",{className:"admin-repeatable__summary"},e.default.createElement("div",{className:"admin-repeatable__summary-left"},e.default.createElement("span",{className:"admin-repeatable__bullet"},"\u25BC"),e.default.createElement("span",{className:"admin-repeatable__name"},_t(x,f,_))),e.default.createElement("div",{className:"admin-repeatable__actions"},e.default.createElement("button",{className:"admin-repeatable__icon-button",type:"button",disabled:s,onClick:m=>{m.preventDefault(),m.stopPropagation(),d([...n,_])},"aria-label":"Delete"},"\u{1F5D1}"),e.default.createElement("button",{className:"admin-repeatable__drag-handle",type:"button",draggable:!s,disabled:s,title:"Drag to reorder",onClick:m=>{m.preventDefault(),m.stopPropagation()},onDragStart:m=>{s||(m.stopPropagation(),m.dataTransfer.effectAllowed="move",m.dataTransfer.setData("text/plain",String(_)),E(_),h(_))},onDragEnd:()=>{E(null),h(null)}},"\u22EE\u22EE"))),e.default.createElement("div",{className:"admin-repeatable__body"},me(x)?e.default.createElement("div",{className:"admin-field-grid"},Object.entries(x).filter(([m])=>m!=="id"&&!Te(m)).map(([m,l])=>e.default.createElement(Ie,{key:`${a}-${_}-${m}`,fieldKey:m,value:l,path:[...n,_,m],onChange:r,onAddItem:i,onRemoveItem:d,onMoveItem:u,disabled:s}))):e.default.createElement(oa,{fieldKey:`${a}-${_}`,value:x,path:[...n,_],onChange:r,disabled:s})))),e.default.createElement("button",{className:"admin-repeatable__add",type:"button",disabled:s,onClick:()=>i(n,De(b))},"+ Add an entry")))}function Ie(a){const{value:t}=a;return Array.isArray(t)?e.default.createElement(Et,a):me(t)?e.default.createElement(xt,a):e.default.createElement(oa,a)}function wt({entries:a,onChange:t,onAddItem:n,onRemoveItem:r,onMoveItem:i,disabled:d}){return e.default.createElement("div",{className:"admin-section"},e.default.createElement("div",{className:"admin-field-grid"},a.map(([u,s])=>Te(u)?null:e.default.createElement(Ie,{key:u,fieldKey:u,value:s,path:[u],onChange:t,onAddItem:n,onRemoveItem:r,onMoveItem:i,disabled:d}))))}function Nt(){const{pageName:a}=G.useParams(),[t,n]=o.useState(!0),[r,i]=o.useState(!1),[d,u]=o.useState(""),[s,f]=o.useState({}),[b,g]=o.useState({}),[E,S]=o.useState(null),[h,x]=o.useState("draft"),[_,m]=o.useState(""),[l,y]=o.useState(!1),w=ue.useNotice(),p=o.useRef(null),v=o.useMemo(()=>h==="published"&&E?E:s,[h,s,E]),c=h==="published"&&E,L=o.useMemo(()=>JSON.stringify(ie(s))!==JSON.stringify(ie(b)),[s,b]),M=o.useMemo(()=>Pe(s),[s]),F=o.useMemo(()=>JSON.stringify(ie(s))!==JSON.stringify(ie(E)),[s,E]),z=!c&&!r&&L,B=!c&&!r&&(E?F:M),H=!r&&!c&&M,U=!r&&!!E,O=o.useMemo(()=>yt(a,v),[a,v]),k=o.useMemo(()=>v?.heroTitle||v?.title||v?.siteName||d,[v,d]);o.useEffect(()=>{let D=!0;return(async()=>{n(!0),m("");try{const T=await aa.getPage({pageName:a});if(!D)return;const R=re(T.data.draftData??T.data.data??{});f(R),g(re(R)),S(T.data.publishedData?re(T.data.publishedData):null),x("draft"),y(!1),u(T.data.label??oe(a))}catch(T){if(!D)return;m(la(T,"Failed to load this content page."))}finally{D&&n(!1)}})(),()=>{D=!1}},[a]),o.useEffect(()=>{if(!l)return;const D=I=>{p.current&&!p.current.contains(I.target)&&y(!1)};return document.addEventListener("mousedown",D),()=>{document.removeEventListener("mousedown",D)}},[l]);const P=(D,I)=>{f(T=>ta(T,D,I))},W=(D,I)=>{f(T=>ra(T,D,I))},Y=D=>{f(I=>na(I,D))},K=(D,I)=>{f(T=>ia(T,D,I))},J=async(D="save")=>{i(!0),m(""),y(!1);try{const I=await aa.getPage({pageName:a,method:"post",data:{content:s,intent:D}}),T=re(I.data.draftData??I.data.data??{});f(T),g(re(T)),S(I.data.publishedData?re(I.data.publishedData):null),D==="unpublish"&&x("draft"),w({message:I.data.notice?.message??`${d} saved.`,type:"success"})}catch(I){const T=la(I,"Failed to save this content page.");m(T),w({message:T,type:"error"})}finally{i(!1)}},ee=()=>{f(De(s)),x("draft"),y(!1)};return t?e.default.createElement("div",{style:{display:"flex",justifyContent:"center",alignItems:"center",height:"100%"}},e.default.createElement(A.Loader,null)):e.default.createElement(e.default.Fragment,null,e.default.createElement("style",null,ot),e.default.createElement("div",{className:"admin-editor"},e.default.createElement("div",{className:"admin-editor__inner"},e.default.createElement("button",{className:"admin-back",type:"button",onClick:()=>window.history.back()},"\u2190 Back"),e.default.createElement("div",{className:"admin-header"},e.default.createElement("div",null,e.default.createElement("div",{className:"admin-meta"},"Single Type"),e.default.createElement("h1",{className:"admin-title"},k),e.default.createElement("div",{className:"admin-status"},E?"Published":"Draft"))),e.default.createElement("div",{className:"admin-tabs"},e.default.createElement("button",{className:`admin-tab${h==="draft"?" admin-tab--active":""}`,type:"button",onClick:()=>x("draft")},"DRAFT"),e.default.createElement("button",{className:`admin-tab${h==="published"?" admin-tab--active":""}`,type:"button",onClick:()=>E&&x("published")},"PUBLISHED")),_?e.default.createElement(A.MessageBox,{variant:"danger"},_):null,e.default.createElement("div",{className:"admin-layout"},e.default.createElement("div",{className:"admin-main-card"},O.map((D,I)=>e.default.createElement(wt,{key:`section-${I}`,entries:D.entries,onChange:P,onAddItem:W,onRemoveItem:Y,onMoveItem:K,disabled:c}))),e.default.createElement("aside",null,e.default.createElement("div",{className:"admin-side-card"},e.default.createElement("div",{className:"admin-side-card__head"},"Entry"),e.default.createElement("div",{className:"admin-side-card__body"},e.default.createElement("div",{className:"admin-side-button-row"},e.default.createElement("button",{className:"admin-side-button--secondary",type:"button",onClick:()=>J("publish"),disabled:!B},"Publish"),e.default.createElement("button",{className:"admin-side-button--secondary admin-side-button--menu",type:"button",onClick:()=>y(D=>!D)},"\u2026"),l?e.default.createElement("div",{ref:p,className:"admin-side-action-menu"},e.default.createElement("button",{className:"admin-side-action-menu__item admin-side-action-menu__item--danger",type:"button",onClick:()=>J("unpublish"),disabled:!U},e.default.createElement("span",{className:"admin-side-action-menu__icon"},"\xD7"),"Unpublish"),e.default.createElement("button",{className:"admin-side-action-menu__item admin-side-action-menu__item--danger",type:"button",onClick:ee,disabled:!H},e.default.createElement("span",{className:"admin-side-action-menu__icon"},"\xD7"),"Discard changes")):null),e.default.createElement("button",{className:"admin-side-button",type:"button",onClick:()=>J("save"),disabled:!z},r?"Saving...":"Save"))))))))}const vt="adminjs-media-select",kt=`
.admin-media-page {
  min-height: 100%;
  padding: 28px 40px 48px 40px;
  background: #f6f6f9;
  color: #32324d;
}

.admin-media-page__inner {
  max-width: 1860px;
  margin: 0 auto;
}

.admin-media-page__top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 24px;
  margin-bottom: 28px;
}

.admin-media-page__title {
  margin: 0;
  font-size: 3rem;
  line-height: 3.5rem;
  font-weight: 700;
  color: #32324d;
}

.admin-media-page__actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.admin-media-page__button,
.admin-media-page__button--primary,
.admin-media-page__icon-button {
  border-radius: 4px;
  min-height: 2.5rem;
  font-size: 1rem;
  line-height: 1.5rem;
  font-weight: 600;
  cursor: pointer;
}

.admin-media-page__button {
  border: 1px solid #dcdce4;
  background: #ffffff;
  color: #32324d;
  padding: 0 1rem;
}

.admin-media-page__button--primary {
  border: 1px solid #4945ff;
  background: #4945ff;
  color: #ffffff;
  padding: 0 1.25rem;
}

.admin-media-page__toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  margin-bottom: 28px;
}

.admin-media-page__toolbar-left,
.admin-media-page__toolbar-right {
  display: flex;
  align-items: center;
  gap: 12px;
}

.admin-media-page__square,
.admin-media-page__icon-button {
  width: 2.5rem;
  height: 2.5rem;
  border: 1px solid #dcdce4;
  background: #ffffff;
  color: #666687;
  display: grid;
  place-items: center;
  border-radius: 4px;
}

.admin-media-page__select,
.admin-media-page__search {
  min-height: 2.5rem;
  border: 1px solid #dcdce4;
  border-radius: 4px;
  background: #ffffff;
  color: #32324d;
  padding: 0 1rem;
  font-size: 1rem;
}

.admin-media-page__search {
  min-width: 280px;
}

.admin-media-page__select {
  min-width: 268px;
  appearance: none;
}

.admin-media-page__section-title {
  margin: 0 0 18px;
  font-size: 2rem;
  line-height: 2.5rem;
  font-weight: 700;
}

.admin-media-page__count {
  color: #666687;
}

.admin-media-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 24px;
}

.admin-asset-card {
  border: 1px solid #dcdce4;
  border-radius: 4px;
  background: #ffffff;
  overflow: hidden;
  box-shadow: 0 1px 2px rgba(33, 33, 52, 0.06);
  cursor: pointer;
}

.admin-asset-card:hover {
  box-shadow: 0 4px 12px rgba(33, 33, 52, 0.08);
}

.admin-asset-card__preview {
  position: relative;
  min-height: 256px;
  padding: 16px;
  background:
    linear-gradient(45deg, #f6f6f9 25%, transparent 25%, transparent 75%, #f6f6f9 75%, #f6f6f9),
    linear-gradient(45deg, #f6f6f9 25%, transparent 25%, transparent 75%, #f6f6f9 75%, #f6f6f9);
  background-position: 0 0, 12px 12px;
  background-size: 24px 24px;
}

.admin-asset-card__checkbox {
  position: absolute;
  top: 16px;
  left: 16px;
  width: 24px;
  height: 24px;
  border: 1px solid #c0c0cf;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.92);
}

.admin-asset-card__image {
  width: 100%;
  height: 224px;
  object-fit: cover;
  display: block;
}

.admin-asset-card__body {
  padding: 14px 18px 16px;
}

.admin-asset-card__title-row {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 4px;
}

.admin-asset-card__title {
  font-size: 1rem;
  line-height: 1.5rem;
  font-weight: 600;
  overflow-wrap: anywhere;
}

.admin-asset-card__type {
  flex: 0 0 auto;
  min-height: 2rem;
  padding: 0 0.75rem;
  border-radius: 4px;
  background: #f6f6f9;
  color: #666687;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 0.875rem;
  line-height: 1rem;
  font-weight: 700;
}

.admin-asset-card__meta {
  color: #666687;
  font-size: 0.875rem;
  line-height: 1.25rem;
}

.admin-media-detail__back {
  border: 0;
  background: transparent;
  color: #4945ff;
  font-size: 0.875rem;
  line-height: 1.25rem;
  cursor: pointer;
  padding: 0;
  margin-bottom: 18px;
}

.admin-media-detail__layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 360px;
  gap: 24px;
}

.admin-media-detail__preview,
.admin-media-detail__card {
  border: 1px solid #dcdce4;
  border-radius: 4px;
  background: #ffffff;
  box-shadow: 0 1px 2px rgba(33, 33, 52, 0.06);
}

.admin-media-detail__preview {
  padding: 24px;
}

.admin-media-detail__canvas {
  min-height: 620px;
  display: grid;
  place-items: center;
  border: 1px solid #dcdce4;
  border-radius: 4px;
  background:
    linear-gradient(45deg, #f6f6f9 25%, transparent 25%, transparent 75%, #f6f6f9 75%, #f6f6f9),
    linear-gradient(45deg, #f6f6f9 25%, transparent 25%, transparent 75%, #f6f6f9 75%, #f6f6f9);
  background-position: 0 0, 12px 12px;
  background-size: 24px 24px;
}

.admin-media-detail__image {
  max-width: 100%;
  max-height: 580px;
  object-fit: contain;
}

.admin-media-detail__side {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.admin-media-detail__card-head {
  padding: 14px 16px 8px;
  color: #666687;
  font-size: 0.75rem;
  line-height: 1rem;
  font-weight: 700;
  text-transform: uppercase;
}

.admin-media-detail__card-body {
  padding: 0 16px 16px;
}

.admin-media-detail__field + .admin-media-detail__field {
  margin-top: 16px;
}

.admin-media-detail__label {
  display: block;
  margin-bottom: 6px;
  font-size: 0.75rem;
  line-height: 1rem;
  font-weight: 700;
  color: #666687;
}

.admin-media-detail__input,
.admin-media-detail__textarea {
  width: 100%;
  box-sizing: border-box;
  min-height: 2.5rem;
  padding: 0.625rem 0.875rem;
  border: 1px solid #dcdce4;
  border-radius: 4px;
  background: #f6f6f9;
  color: #666687;
  font-size: 0.875rem;
  line-height: 1.25rem;
}

.admin-media-detail__textarea {
  min-height: 6rem;
  resize: none;
}

.admin-media-detail__meta-list {
  display: grid;
  gap: 12px;
}

.admin-media-detail__meta-item {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  font-size: 0.875rem;
  line-height: 1.25rem;
}

.admin-media-detail__meta-key {
  color: #666687;
  font-weight: 600;
}

.admin-media-detail__meta-value {
  color: #32324d;
  text-align: right;
  overflow-wrap: anywhere;
}

@media (max-width: 1080px) {
  .admin-media-detail__layout {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 960px) {
  .admin-media-page {
    padding: 20px 16px 40px 72px;
  }

  .admin-media-page__top,
  .admin-media-page__toolbar {
    flex-direction: column;
    align-items: stretch;
  }

  .admin-media-page__toolbar-left,
  .admin-media-page__toolbar-right,
  .admin-media-page__actions {
    flex-wrap: wrap;
  }

  .admin-media-page__search,
  .admin-media-page__select {
    min-width: 0;
    width: 100%;
  }
}
`;function Le(a,t){const n=new URLSearchParams;Object.entries(t).forEach(([i,d])=>{d!=null&&d!==""&&n.set(i,String(d))});const r=n.toString();return`${a}${r?`?${r}`:""}`}async function ma(a={}){const t=new URLSearchParams(a),n=await fetch(`/admin/api/pages/media-library${t.toString()?`?${t.toString()}`:""}`,{credentials:"same-origin"}),r=await n.json();if(!n.ok)throw new Error(r.message??"Failed to load media.");return r}async function St(a){const t=new FormData;t.append("file",a);const n=await fetch("/admin/api/media/upload",{method:"POST",body:t,credentials:"same-origin"}),r=await n.json().catch(()=>({}));if(!n.ok)throw new Error(r.error||"Failed to upload image.");return r}function Ct({item:a,onOpen:t,pickerMode:n}){return e.default.createElement("article",{className:"admin-asset-card",onClick:()=>t(a)},e.default.createElement("div",{className:"admin-asset-card__preview"},e.default.createElement("img",{className:"admin-asset-card__image",src:a.thumbnailUrl||a.url,alt:a.alternativeText||a.name})),e.default.createElement("div",{className:"admin-asset-card__body"},e.default.createElement("div",{className:"admin-asset-card__title-row"},e.default.createElement("div",{className:"admin-asset-card__title"},a.name),e.default.createElement("div",{className:"admin-asset-card__type"},a.mime.startsWith("image/")?"IMAGE":a.ext.replace(".","").toUpperCase())),e.default.createElement("div",{className:"admin-asset-card__meta"},a.ext.replace(".","").toUpperCase()," - ",a.width,"\xD7",a.height),n?e.default.createElement("div",{className:"admin-asset-card__meta",style:{marginTop:8,color:"#4945ff",fontWeight:700}},"Use this asset"):null))}function At({item:a,onBack:t,onSelect:n,pickerMode:r}){return e.default.createElement("div",null,e.default.createElement("button",{className:"admin-media-detail__back",type:"button",onClick:t},"\u2190 Back"),e.default.createElement("div",{className:"admin-media-page__top",style:{marginBottom:24}},e.default.createElement("h1",{className:"admin-media-page__title",style:{fontSize:"2.25rem",lineHeight:"2.75rem"}},a.name),e.default.createElement("div",{className:"admin-media-page__actions"},r?e.default.createElement("button",{className:"admin-media-page__button--primary",type:"button",onClick:()=>n(a)},"Use this asset"):null,e.default.createElement("button",{className:"admin-media-page__button--primary",type:"button",onClick:()=>window.open(a.url,"_blank","noopener,noreferrer")},"Open asset"))),e.default.createElement("div",{className:"admin-media-detail__layout"},e.default.createElement("section",{className:"admin-media-detail__preview"},e.default.createElement("div",{className:"admin-media-detail__canvas"},e.default.createElement("img",{className:"admin-media-detail__image",src:a.url,alt:a.alternativeText||a.name}))),e.default.createElement("aside",{className:"admin-media-detail__side"},e.default.createElement("div",{className:"admin-media-detail__card"},e.default.createElement("div",{className:"admin-media-detail__card-head"},"Details"),e.default.createElement("div",{className:"admin-media-detail__card-body"},e.default.createElement("div",{className:"admin-media-detail__field"},e.default.createElement("label",{className:"admin-media-detail__label"},"File name"),e.default.createElement("input",{className:"admin-media-detail__input",value:a.name||"",disabled:!0,readOnly:!0})),e.default.createElement("div",{className:"admin-media-detail__field"},e.default.createElement("label",{className:"admin-media-detail__label"},"Alternative text"),e.default.createElement("input",{className:"admin-media-detail__input",value:a.alternativeText||"",disabled:!0,readOnly:!0})),e.default.createElement("div",{className:"admin-media-detail__field"},e.default.createElement("label",{className:"admin-media-detail__label"},"Caption"),e.default.createElement("textarea",{className:"admin-media-detail__textarea",value:a.caption||"",disabled:!0,readOnly:!0})))),e.default.createElement("div",{className:"admin-media-detail__card"},e.default.createElement("div",{className:"admin-media-detail__card-head"},"Metadata"),e.default.createElement("div",{className:"admin-media-detail__card-body"},e.default.createElement("div",{className:"admin-media-detail__meta-list"},e.default.createElement("div",{className:"admin-media-detail__meta-item"},e.default.createElement("span",{className:"admin-media-detail__meta-key"},"Dimensions"),e.default.createElement("span",{className:"admin-media-detail__meta-value"},a.width," \xD7 ",a.height)),e.default.createElement("div",{className:"admin-media-detail__meta-item"},e.default.createElement("span",{className:"admin-media-detail__meta-key"},"Size"),e.default.createElement("span",{className:"admin-media-detail__meta-value"},a.sizeLabel)),e.default.createElement("div",{className:"admin-media-detail__meta-item"},e.default.createElement("span",{className:"admin-media-detail__meta-key"},"Type"),e.default.createElement("span",{className:"admin-media-detail__meta-value"},a.mime)),e.default.createElement("div",{className:"admin-media-detail__meta-item"},e.default.createElement("span",{className:"admin-media-detail__meta-key"},"Provider"),e.default.createElement("span",{className:"admin-media-detail__meta-value"},a.provider||"local")),e.default.createElement("div",{className:"admin-media-detail__meta-item"},e.default.createElement("span",{className:"admin-media-detail__meta-key"},"Folder"),e.default.createElement("span",{className:"admin-media-detail__meta-value"},a.folderPath||"/")),e.default.createElement("div",{className:"admin-media-detail__meta-item"},e.default.createElement("span",{className:"admin-media-detail__meta-key"},"Updated"),e.default.createElement("span",{className:"admin-media-detail__meta-value"},a.updatedAtLabel)),e.default.createElement("div",{className:"admin-media-detail__meta-item"},e.default.createElement("span",{className:"admin-media-detail__meta-key"},"Created"),e.default.createElement("span",{className:"admin-media-detail__meta-value"},a.createdAtLabel)),e.default.createElement("div",{className:"admin-media-detail__meta-item"},e.default.createElement("span",{className:"admin-media-detail__meta-key"},"Document ID"),e.default.createElement("span",{className:"admin-media-detail__meta-value"},a.documentId))))))))}function Pt(){const a=G.useLocation(),t=G.useNavigate(),n=o.useMemo(()=>new URLSearchParams(a.search),[a.search]),r=n.get("search")||"",i=n.get("fileId")||"",d=n.get("picker")==="1",[u,s]=o.useState(!0),[f,b]=o.useState(""),[g,E]=o.useState([]),[S,h]=o.useState(0),[x,_]=o.useState(null),[m,l]=o.useState(!1);o.useEffect(()=>{let p=!0;return(async()=>{s(!0),b("");try{const c=await ma(i?{fileId:i}:{search:r});if(!p)return;E(c.items??[]),h(c.count??0),_(c.item??null)}catch(c){if(!p)return;b(c.message)}finally{p&&s(!1)}})(),()=>{p=!1}},[i,r]);const y=(p=r)=>{t(Le("/admin/pages/media-library",{...p?{search:p}:{},...d?{picker:1}:{}}))},w=p=>{if(!d){t(Le("/admin/pages/media-library",{fileId:p.id}));return}window.opener&&window.opener.postMessage({type:vt,url:p.relativeUrl||p.url||""},window.location.origin),window.close()};return u?e.default.createElement("div",{style:{display:"flex",justifyContent:"center",alignItems:"center",height:"100%"}},e.default.createElement(A.Loader,null)):e.default.createElement(e.default.Fragment,null,e.default.createElement("style",null,kt),e.default.createElement("div",{className:"admin-media-page"},e.default.createElement("div",{className:"admin-media-page__inner"},f?e.default.createElement(A.MessageBox,{variant:"danger"},f):null,i&&x?e.default.createElement(At,{item:x,onBack:()=>y(),onSelect:w,pickerMode:d}):e.default.createElement(e.default.Fragment,null,e.default.createElement("div",{className:"admin-media-page__top"},e.default.createElement("h1",{className:"admin-media-page__title"},d?"Choose Media":"Media Library"),e.default.createElement("div",{className:"admin-media-page__actions"},e.default.createElement("button",{className:"admin-media-page__button--primary",type:"button",disabled:m,onClick:()=>{const p=document.createElement("input");p.type="file",p.accept="image/*",p.multiple=!0,p.onchange=async()=>{const v=Array.from(p.files??[]);if(v.length){l(!0),b("");try{for(const L of v)await St(L);const c=await ma(r?{search:r}:{});E(c.items??[]),h(c.count??0)}catch(c){b(c.message)}finally{l(!1)}}},p.click()}},m?"Uploading...":"+ Add new assets"))),e.default.createElement("div",{className:"admin-media-page__toolbar"},e.default.createElement("div",{className:"admin-media-page__toolbar-left"},e.default.createElement("select",{className:"admin-media-page__select",defaultValue:"recent"},e.default.createElement("option",{value:"recent"},"Most recent uploads")),e.default.createElement("button",{className:"admin-media-page__button",type:"button"},"Filters")),e.default.createElement("div",{className:"admin-media-page__toolbar-right"},e.default.createElement("input",{className:"admin-media-page__search",value:r,onChange:p=>y(p.target.value),placeholder:"Search assets"}))),e.default.createElement("h2",{className:"admin-media-page__section-title"},"Assets ",e.default.createElement("span",{className:"admin-media-page__count"},"(",S,")")),e.default.createElement("div",{className:"admin-media-grid"},g.map(p=>e.default.createElement(Ct,{key:p.id,item:p,pickerMode:d,onOpen:d?w:v=>t(Le("/admin/pages/media-library",{fileId:v.id}))})))))))}const Dt=`
.admin-account-page {
  min-height: 100%;
  padding: 32px 40px 64px 40px;
  background: #f6f6f9;
  color: #32324d;
}

.admin-account-page__inner {
  max-width: 760px;
}

.admin-account-page__eyebrow {
  margin: 0 0 4px;
  color: #666687;
  font-size: 0.75rem;
  line-height: 1rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.03em;
}

.admin-account-page__title {
  margin: 0;
  font-size: 2.25rem;
  line-height: 2.75rem;
  font-weight: 700;
}

.admin-account-page__subtitle {
  margin: 10px 0 28px;
  color: #666687;
  font-size: 1rem;
  line-height: 1.5rem;
}

.admin-account-card {
  border: 1px solid #dcdce4;
  border-radius: 4px;
  background: #ffffff;
  box-shadow: 0 1px 2px rgba(33, 33, 52, 0.06);
  padding: 24px;
}

.admin-account-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.admin-account-field {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.admin-account-field--full {
  grid-column: 1 / -1;
}

.admin-account-label {
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: 600;
}

.admin-account-input {
  min-height: 2.75rem;
  border: 1px solid #dcdce4;
  border-radius: 4px;
  background: #ffffff;
  color: #32324d;
  padding: 0 0.875rem;
  font-size: 0.9375rem;
}

.admin-account-input:focus {
  outline: none;
  border-color: #4945ff;
}

.admin-account-actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-top: 24px;
}

.admin-account-hint {
  color: #666687;
  font-size: 0.875rem;
  line-height: 1.25rem;
}

.admin-account-button,
.admin-account-button--primary,
.admin-account-button--ghost {
  min-height: 2.75rem;
  border-radius: 4px;
  font-size: 0.9375rem;
  line-height: 1.25rem;
  font-weight: 600;
  cursor: pointer;
  padding: 0 1rem;
}

.admin-account-button {
  border: 1px solid #dcdce4;
  background: #ffffff;
  color: #32324d;
}

.admin-account-button--primary {
  border: 1px solid #4945ff;
  background: #4945ff;
  color: #ffffff;
}

.admin-account-button--ghost {
  border: 0;
  background: transparent;
  color: #4945ff;
  padding: 0;
}

@media (max-width: 960px) {
  .admin-account-page {
    padding: 20px 16px 48px;
  }

  .admin-account-grid {
    grid-template-columns: 1fr;
  }
}
`;async function ca(a="GET",t){const n=await fetch("/admin/api/pages/account",{method:a,credentials:"same-origin",headers:t?{"Content-Type":"application/json"}:void 0,body:t?JSON.stringify(t):void 0}),r=await n.json().catch(()=>({}));if(!n.ok)throw new Error(r.message||"Failed to update account.");return r}function Tt(){const[a,t]=o.useState(!0),[n,r]=o.useState(!1),[i,d]=o.useState(""),[u,s]=o.useState(""),[f,b]=o.useState(""),[g,E]=o.useState(""),[S,h]=o.useState(""),[x,_]=o.useState("");o.useEffect(()=>{let l=!0;return ca().then(y=>{l&&b(y.email||"")}).catch(y=>{l&&d(y.message)}).finally(()=>{l&&t(!1)}),()=>{l=!1}},[]);const m=async l=>{if(l.preventDefault(),d(""),s(""),!g){d("Current password is required.");return}if(S&&S!==x){d("New password confirmation does not match.");return}r(!0);try{const y=await ca("POST",{email:f,currentPassword:g,newPassword:S});s(y.message||"Account updated. Sign in again."),E(""),h(""),_(""),window.setTimeout(()=>{window.location.assign("/admin/logout")},900)}catch(y){d(y.message)}finally{r(!1)}};return a?e.default.createElement("div",{style:{display:"flex",justifyContent:"center",alignItems:"center",height:"100%"}},e.default.createElement(A.Loader,null)):e.default.createElement(e.default.Fragment,null,e.default.createElement("style",null,Dt),e.default.createElement("div",{className:"admin-account-page"},e.default.createElement("div",{className:"admin-account-page__inner"},e.default.createElement("p",{className:"admin-account-page__eyebrow"},"Account"),e.default.createElement("h1",{className:"admin-account-page__title"},"Account settings"),e.default.createElement("p",{className:"admin-account-page__subtitle"},"Update the admin email address or password used to sign in."),i?e.default.createElement(A.MessageBox,{variant:"danger",mb:"lg"},i):null,u?e.default.createElement(A.MessageBox,{variant:"success",mb:"lg"},u):null,e.default.createElement("form",{className:"admin-account-card",onSubmit:m},e.default.createElement("div",{className:"admin-account-grid"},e.default.createElement("label",{className:"admin-account-field admin-account-field--full"},e.default.createElement("span",{className:"admin-account-label"},"Email"),e.default.createElement("input",{className:"admin-account-input",type:"email",value:f,onChange:l=>b(l.target.value),autoComplete:"email"})),e.default.createElement("label",{className:"admin-account-field admin-account-field--full"},e.default.createElement("span",{className:"admin-account-label"},"Current password"),e.default.createElement("input",{className:"admin-account-input",type:"password",value:g,onChange:l=>E(l.target.value),autoComplete:"current-password"})),e.default.createElement("label",{className:"admin-account-field"},e.default.createElement("span",{className:"admin-account-label"},"New password"),e.default.createElement("input",{className:"admin-account-input",type:"password",value:S,onChange:l=>h(l.target.value),autoComplete:"new-password"})),e.default.createElement("label",{className:"admin-account-field"},e.default.createElement("span",{className:"admin-account-label"},"Confirm new password"),e.default.createElement("input",{className:"admin-account-input",type:"password",value:x,onChange:l=>_(l.target.value),autoComplete:"new-password"}))),e.default.createElement("div",{className:"admin-account-actions"},e.default.createElement("div",{className:"admin-account-hint"},"Saving account changes signs the current session out."),e.default.createElement("div",{style:{display:"flex",gap:12,alignItems:"center"}},e.default.createElement("button",{className:"admin-account-button--ghost",type:"button",onClick:()=>window.location.assign("/admin/logout")},"Sign out"),e.default.createElement("button",{className:"admin-account-button--primary",type:"submit",disabled:n},n?"Saving...":"Save account")))))))}const It=`
.refund-page {
  min-height: 100%;
  padding: 32px 40px 64px 40px;
  background: #f6f6f9;
  color: #32324d;
}

.refund-page__inner {
  max-width: 1240px;
  margin: 0 auto;
}

.refund-page__eyebrow {
  margin: 0 0 4px;
  color: #666687;
  font-size: 0.75rem;
  line-height: 1rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.03em;
}

.refund-page__title {
  margin: 0;
  font-size: 2.25rem;
  line-height: 2.75rem;
  font-weight: 700;
}

.refund-page__subtitle {
  margin: 10px 0 28px;
  max-width: 780px;
  color: #666687;
  font-size: 1rem;
  line-height: 1.5rem;
}

.refund-page__tabs {
  display: flex;
  gap: 0;
  border-bottom: 2px solid #dcdce4;
  margin-bottom: 24px;
}

.refund-page__tab {
  appearance: none;
  border: 0;
  background: transparent;
  padding: 10px 20px;
  font-size: 0.875rem;
  font-weight: 600;
  color: #666687;
  cursor: pointer;
  border-bottom: 2px solid transparent;
  margin-bottom: -2px;
  transition: color 0.15s, border-color 0.15s;
}

.refund-page__tab:hover {
  color: #32324d;
}

.refund-page__tab--active {
  color: #4945ff;
  border-bottom-color: #4945ff;
}

.refund-page__badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 18px;
  height: 18px;
  padding: 0 5px;
  border-radius: 9px;
  font-size: 0.6875rem;
  font-weight: 700;
  line-height: 1;
  color: #fff;
  background: #c72e3a;
  margin-left: 6px;
  vertical-align: middle;
}

.refund-page__badge--muted {
  background: #8e8ea9;
}

.refund-page__table-wrap {
  border: 1px solid #dcdce4;
  border-radius: 4px;
  background: #ffffff;
  overflow-x: auto;
}

.refund-page__table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.875rem;
  line-height: 1.5rem;
}

.refund-page__table th {
  text-align: left;
  padding: 12px 16px;
  font-size: 0.75rem;
  font-weight: 700;
  color: #666687;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  border-bottom: 1px solid #eaebf0;
  white-space: nowrap;
}

.refund-page__table td {
  padding: 14px 16px;
  border-bottom: 1px solid #f0f0f5;
  color: #32324d;
  vertical-align: middle;
}

.refund-page__table tr:last-child td {
  border-bottom: 0;
}

.refund-page__table tr:hover td {
  background: #fafafa;
}

.refund-page__name {
  font-weight: 600;
}

.refund-page__email {
  font-size: 0.75rem;
  color: #666687;
}

.refund-page__amount {
  font-weight: 700;
  color: #328048;
}

.refund-page__status-badge {
  display: inline-flex;
  align-items: center;
  padding: 3px 10px;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
  line-height: 1.25rem;
}

.refund-page__status-badge--pending {
  background: #fef3cd;
  color: #856404;
}

.refund-page__status-badge--approved {
  background: #d4edda;
  color: #155724;
}

.refund-page__status-badge--rejected {
  background: #f8d7da;
  color: #721c24;
}

.refund-page__actions {
  display: flex;
  gap: 6px;
}

.refund-page__btn {
  appearance: none;
  border: 1px solid #d9d8e6;
  border-radius: 4px;
  padding: 6px 12px;
  font-size: 0.75rem;
  line-height: 1rem;
  font-weight: 600;
  color: #32324d;
  background: #fff;
  cursor: pointer;
  white-space: nowrap;
}

.refund-page__btn:hover {
  background: #f6f6f9;
}

.refund-page__btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.refund-page__btn--approve {
  border-color: #c3e6cb;
  color: #1e7a33;
}

.refund-page__btn--approve:hover {
  background: #f0faf3;
}

.refund-page__btn--reject {
  border-color: #ffd3c7;
  color: #c72e3a;
}

.refund-page__btn--reject:hover {
  background: #fff5f2;
}

.refund-page__empty {
  padding: 40px 20px;
  text-align: center;
  color: #666687;
  font-size: 0.9375rem;
  line-height: 1.5rem;
}

.refund-page__error {
  color: #c72e3a;
  margin: 12px 0 0;
  font-size: 0.8125rem;
  line-height: 1rem;
}

.refund-page__success {
  color: #328048;
  font-size: 0.75rem;
  font-weight: 600;
}

.refund-page__loading {
  padding: 40px 20px;
  text-align: center;
  color: #8e8ea9;
  font-size: 0.875rem;
}

@media (max-width: 960px) {
  .refund-page {
    padding: 20px 16px 48px;
  }
}
`;function Lt(a){if(!a)return null;try{return JSON.parse(a)}catch{return null}}async function ce(a,t={}){const n=await fetch(a,{credentials:"same-origin",...t,headers:{"Content-Type":"application/json",...t.headers||{}}}),r=await n.text(),i=Lt(r);if(!n.ok){const d=i?.error||i?.message||r||`Request failed (${n.status}).`;throw new Error(d)}return i}function ua(a){if(!a)return"-";const t=new Date(a);return Number.isNaN(t.getTime())?"-":new Intl.DateTimeFormat("en-GB",{weekday:"short",day:"numeric",month:"short",year:"numeric",hour:"2-digit",minute:"2-digit"}).format(t)}function Ft(a,t="gbp"){const n=Number(a||0)/100;try{return new Intl.NumberFormat("en-GB",{style:"currency",currency:String(t||"gbp").toUpperCase()}).format(n)}catch{return`\xA3${n.toFixed(2)}`}}function zt(a){if(!a)return"-";const t=new Date(a);if(Number.isNaN(t.getTime()))return"-";const n=Date.now()-t.getTime(),r=Math.floor(n/6e4);if(r<1)return"just now";if(r<60)return`${r}m ago`;const i=Math.floor(r/60);if(i<24)return`${i}h ago`;const d=Math.floor(i/24);return d<30?`${d}d ago`:ua(a)}function $t(){const[a,t]=o.useState("pending"),[n,r]=o.useState([]),[i,d]=o.useState([]),[u,s]=o.useState(!0),[f,b]=o.useState(null),[g,E]=o.useState(""),[S,h]=o.useState({});o.useEffect(()=>{let l=!0;return(async()=>{s(!0);try{const[w,p]=await Promise.all([ce("/admin/api/admin/bookings/refund-requests"),ce("/admin/api/admin/bookings/refund-requests?status=processed")]);l&&(r(Array.isArray(w?.data)?w.data:[]),d(Array.isArray(p?.data)?p.data:[]))}catch{try{const p=await ce("/admin/api/admin/bookings/refund-requests");l&&r(Array.isArray(p?.data)?p.data:[])}catch(p){l&&E(p?.message||"Unable to load refund requests.")}}finally{l&&s(!1)}})(),()=>{l=!1}},[]);const x=async l=>{if(!l?.id)return;const y=Number(l.id);b(y),E("");try{await ce(`/admin/api/admin/bookings/${y}/approve-refund`,{method:"POST"}),h(w=>({...w,[y]:"approved"})),setTimeout(()=>{r(w=>w.filter(p=>p.id!==y)),d(w=>[{...l,refundRequestStatus:"approved"},...w]),h(w=>{const p={...w};return delete p[y],p})},1200)}catch(w){E(w?.message||"Unable to approve refund.")}finally{b(null)}},_=async l=>{if(!l?.id)return;const y=Number(l.id);b(y),E("");try{await ce(`/admin/api/admin/bookings/${y}/reject-refund`,{method:"POST"}),h(w=>({...w,[y]:"rejected"})),setTimeout(()=>{r(w=>w.filter(p=>p.id!==y)),d(w=>[{...l,refundRequestStatus:"rejected"},...w]),h(w=>{const p={...w};return delete p[y],p})},1200)}catch(w){E(w?.message||"Unable to reject refund request.")}finally{b(null)}},m=a==="pending"?n:i;return e.default.createElement(e.default.Fragment,null,e.default.createElement("style",null,It),e.default.createElement("div",{className:"refund-page"},e.default.createElement("div",{className:"refund-page__inner"},e.default.createElement("p",{className:"refund-page__eyebrow"},"Operations"),e.default.createElement("h1",{className:"refund-page__title"},"Refund Requests"),e.default.createElement("p",{className:"refund-page__subtitle"},"Review and manage refund requests from members for meeting room bookings and memberships."),e.default.createElement("div",{className:"refund-page__tabs"},e.default.createElement("button",{type:"button",className:`refund-page__tab${a==="pending"?" refund-page__tab--active":""}`,onClick:()=>t("pending")},"Pending",n.length>0&&e.default.createElement("span",{className:"refund-page__badge"},n.length)),e.default.createElement("button",{type:"button",className:`refund-page__tab${a==="processed"?" refund-page__tab--active":""}`,onClick:()=>t("processed")},"Processed",i.length>0&&e.default.createElement("span",{className:"refund-page__badge refund-page__badge--muted"},i.length))),u?e.default.createElement("div",{className:"refund-page__loading"},"Loading refund requests..."):m.length===0?e.default.createElement("div",{className:"refund-page__table-wrap"},e.default.createElement("div",{className:"refund-page__empty"},a==="pending"?"No pending refund requests.":"No processed refund requests yet.")):e.default.createElement("div",{className:"refund-page__table-wrap"},e.default.createElement("table",{className:"refund-page__table"},e.default.createElement("thead",null,e.default.createElement("tr",null,e.default.createElement("th",null,"#"),e.default.createElement("th",null,"Customer"),e.default.createElement("th",null,"Resource"),e.default.createElement("th",null,"Booking date"),e.default.createElement("th",null,"Amount"),e.default.createElement("th",null,"Requested"),a==="processed"&&e.default.createElement("th",null,"Status"),a==="pending"&&e.default.createElement("th",null,"Actions"))),e.default.createElement("tbody",null,m.map(l=>e.default.createElement("tr",{key:l.id},e.default.createElement("td",null,l.id),e.default.createElement("td",null,e.default.createElement("div",{className:"refund-page__name"},l.userName),e.default.createElement("div",{className:"refund-page__email"},l.userEmail)),e.default.createElement("td",null,l.resourceName||"-"),e.default.createElement("td",null,ua(l.startAt)),e.default.createElement("td",null,e.default.createElement("span",{className:"refund-page__amount"},Ft(l.totalMinor,l.currency))),e.default.createElement("td",null,zt(l.refundRequestedAt)),a==="processed"&&e.default.createElement("td",null,e.default.createElement("span",{className:`refund-page__status-badge refund-page__status-badge--${l.refundRequestStatus||"pending"}`},l.refundRequestStatus==="approved"?"Approved":l.refundRequestStatus==="rejected"?"Rejected":l.refundRequestStatus||"-")),a==="pending"&&e.default.createElement("td",null,S[l.id]?e.default.createElement("span",{className:"refund-page__success"},S[l.id]==="approved"?"\u2713 Approved":"\u2715 Rejected"):e.default.createElement("div",{className:"refund-page__actions"},e.default.createElement("button",{type:"button",className:"refund-page__btn refund-page__btn--approve",onClick:()=>x(l),disabled:f===l.id},f===l.id?"Processing...":"\u2713 Approve"),e.default.createElement("button",{type:"button",className:"refund-page__btn refund-page__btn--reject",onClick:()=>_(l),disabled:f===l.id},f===l.id?"Processing...":"\u2715 Reject")))))))),g?e.default.createElement("div",{className:"refund-page__error"},g):null)))}const fa="/admin/pages/refund-requests",Mt=["site-settings","homepage","about-page","blog-page","pricing-page","faq-page","meeting-rooms-page","virtual-office-page","contact-page","privacy-policy-page","terms-page"],Ot={"site-settings":"Site Setting",homepage:"Homepage","about-page":"About Page","blog-page":"Blog Page","pricing-page":"Pricing Page","faq-page":"FAQ Page","meeting-rooms-page":"Meeting Rooms Page","virtual-office-page":"Virtual Office Page","contact-page":"Contact Page","privacy-policy-page":"Privacy Policy Page","terms-page":"Terms Page"},he=304,pa=48,jt=`
.admin-sidebar-shell ~ [data-css="app-content"] {
  box-sizing: border-box;
  padding-left: ${he}px;
  transition: padding-left 0.2s ease;
}

.admin-sidebar-shell.admin-sidebar-shell--rail-only ~ [data-css="app-content"] {
  padding-left: ${pa}px;
}

.admin-sidebar-shell {
  position: fixed;
  inset: 0 auto 0 0;
  width: ${he}px;
  display: flex;
  background: #ffffff;
  border-right: 1px solid #eaebf0;
  z-index: 50;
  transform: translateX(0);
  transition: transform 0.2s ease;
}

.admin-sidebar-shell--rail-only {
  width: ${pa}px;
}

.admin-sidebar-shell--hidden {
  transform: translateX(-${he}px);
}

.admin-sidebar-rail {
  width: 48px;
  border-right: 1px solid #eaebf0;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px 0;
  gap: 10px;
  background: #ffffff;
}

.admin-sidebar-logo {
  width: 28px;
  height: 28px;
  object-fit: contain;
  margin-bottom: 2px;
}

.admin-rail-button {
  width: 32px;
  height: 32px;
  border: 0;
  border-radius: 8px;
  background: transparent;
  color: #666687;
  display: grid;
  place-items: center;
  cursor: pointer;
}

.admin-rail-button--active {
  background: #f0ebff;
  color: #7b79ff;
}

.admin-rail-button svg {
  width: 16px;
  height: 16px;
  stroke: currentColor;
  fill: none;
  stroke-width: 1.8;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.admin-rail-spacer {
  flex: 1;
}

.admin-avatar {
  position: relative;
}

.admin-avatar__button {
  width: 30px;
  height: 30px;
  border: 0;
  border-radius: 999px;
  background: #4945ff;
  color: #ffffff;
  display: grid;
  place-items: center;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
}

.admin-avatar__menu {
  position: absolute;
  left: 42px;
  bottom: 0;
  min-width: 156px;
  border: 1px solid #dcdce4;
  border-radius: 8px;
  background: #ffffff;
  box-shadow: 0 12px 32px rgba(33, 33, 52, 0.16);
  padding: 6px;
  z-index: 90;
}

.admin-avatar__menu button {
  width: 100%;
  border: 0;
  background: transparent;
  text-align: left;
  padding: 8px 10px;
  border-radius: 6px;
  color: #32324d;
  cursor: pointer;
  font-size: 0.875rem;
  line-height: 1.25rem;
}

.admin-avatar__menu button:hover {
  background: #f6f6f9;
}

.admin-sidebar-panel {
  width: 256px;
  display: flex;
  flex-direction: column;
  min-width: 0;
  background: #ffffff;
}

.admin-sidebar-header {
  padding: 14px 16px;
  border-bottom: 1px solid #eaebf0;
  font-size: 1rem;
  line-height: 1.5rem;
  font-weight: 600;
  color: #32324d;
}

.admin-sidebar-body {
  padding: 14px 8px 18px;
  overflow-y: auto;
}

.admin-search {
  padding: 0 8px 12px;
}

.admin-search input {
  width: 100%;
  min-height: 2.25rem;
  padding: 0.5rem 0.75rem;
  border: 1px solid #dcdce4;
  border-radius: 4px;
  background: #ffffff;
  color: #32324d;
  box-sizing: border-box;
  font-size: 0.75rem;
}

.admin-search input:focus {
  outline: none;
  border-color: #4945ff;
}

.admin-group {
  margin-top: 10px;
}

.admin-group__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px 8px;
}

.admin-group__label {
  font-size: 0.6875rem;
  line-height: 1rem;
  font-weight: 700;
  letter-spacing: 0.03em;
  text-transform: uppercase;
  color: #8e8ea9;
}

.admin-group__count {
  min-width: 20px;
  height: 20px;
  padding: 0 6px;
  border-radius: 6px;
  background: #f6f6f9;
  color: #666687;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 0.6875rem;
  line-height: 1rem;
  font-weight: 700;
}

.admin-nav-link {
  width: 100%;
  border: 0;
  background: transparent;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 7px 10px;
  margin: 1px 0;
  color: #32324d;
  cursor: pointer;
  text-align: left;
}

.admin-nav-link:hover {
  background: #f6f6f9;
}

.admin-nav-link--selected {
  background: #f0ebff;
  color: #4945ff;
}

.admin-nav-link__text {
  min-width: 0;
  font-size: 0.875rem;
  line-height: 1.375rem;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.admin-nav-link__icon {
  width: 12px;
  color: #8e8ea9;
  font-size: 10px;
}

@media (max-width: 960px) {
  .admin-sidebar-shell ~ [data-css="app-content"] {
    padding-left: 0;
  }

  .admin-sidebar-shell {
    box-shadow: 0 18px 48px rgba(33, 33, 52, 0.12);
  }

  .admin-sidebar-shell--hidden {
    transform: translateX(-${he}px);
  }
}

@media (min-width: 961px) {
  .admin-sidebar-shell,
  .admin-sidebar-shell--hidden {
    transform: translateX(0);
  }
}
`;function Fe(a,t){return t?a.toLowerCase().includes(t.toLowerCase()):!0}function ze(a,t,n){return Ee.filter(r=>r.sidebarSection===a).map(r=>{const i=`/admin/resources/${r.table}`,d=r.sidebarHref||we(r.table),u=[d,i];return{id:r.table,label:r.sidebarLabel||r.label,href:d,selected:u.some(s=>t.startsWith(s))}}).filter(r=>Fe(r.label,n))}function $e({children:a}){return e.default.createElement("svg",{viewBox:"0 0 24 24","aria-hidden":"true"},a)}function Ut(){return e.default.createElement($e,null,e.default.createElement("path",{d:"M4.5 10.5 12 4l7.5 6.5"}),e.default.createElement("path",{d:"M6.5 9.5V19h11V9.5"}),e.default.createElement("path",{d:"M10 19v-5h4v5"}))}function Bt(){return e.default.createElement($e,null,e.default.createElement("path",{d:"m3.5 20.5 4.25-1 9.75-9.75-3.25-3.25L4.5 16.25l-1 4.25Z"}),e.default.createElement("path",{d:"m13.5 6.5 3.25 3.25"}),e.default.createElement("path",{d:"M7.5 19.5h13"}))}function Rt(){return e.default.createElement($e,null,e.default.createElement("rect",{x:"3.5",y:"5.5",width:"17",height:"13",rx:"2"}),e.default.createElement("circle",{cx:"8.5",cy:"10",r:"1.5"}),e.default.createElement("path",{d:"m5.5 16 4-4 3 3 2-2 4 3"}))}function qt({isVisible:a}){const t=G.useLocation(),n=G.useNavigate(),r=xe.useSelector(c=>c.pages),i=xe.useSelector(c=>c.session),[d,u]=o.useState(""),[s,f]=o.useState(!1),[b,g]=o.useState(0),E=o.useRef(null),S=o.useMemo(()=>Mt.map(c=>r.find(L=>L.name===c)).filter(Boolean).map(c=>({id:c.name,label:Ot[c.name]??c.name,href:`/admin/pages/${c.name}`,selected:t.pathname.startsWith(`/admin/pages/${c.name}`)})).filter(c=>Fe(c.label,d)),[t.pathname,r,d]),h=o.useMemo(()=>ze("collections",t.pathname,d),[t.pathname,d]),x=o.useMemo(()=>ze("orders",t.pathname,d),[t.pathname,d]),_=o.useMemo(()=>ze("customers",t.pathname,d),[t.pathname,d]),m=o.useMemo(()=>Fe("Refund Requests",d),[d]),l=t.pathname.startsWith(fa);o.useEffect(()=>{let c=!0;const L=async()=>{try{const F=await fetch("/admin/api/admin/bookings/refund-requests",{credentials:"same-origin"});if(!F.ok)return;const z=await F.json();c&&Array.isArray(z?.data)&&g(z.data.length)}catch{}};L();const M=setInterval(L,3e4);return()=>{c=!1,clearInterval(M)}},[]);const y=(i?.email?.[0]??"C").toUpperCase(),w=t.pathname==="/admin"||t.pathname==="/admin/",p=t.pathname.startsWith("/admin/pages/media-library"),v=!p;return o.useEffect(()=>{if(!s)return;const c=L=>{E.current?.contains(L.target)||f(!1)};return document.addEventListener("mousedown",c),()=>document.removeEventListener("mousedown",c)},[s]),e.default.createElement(e.default.Fragment,null,e.default.createElement("style",null,jt),e.default.createElement("div",{className:`admin-sidebar-shell${v?"":" admin-sidebar-shell--rail-only"}${a?"":" admin-sidebar-shell--hidden"}`},e.default.createElement("div",{className:"admin-sidebar-rail"},e.default.createElement("img",{className:"admin-sidebar-logo",src:"/admin-assets/client-mark.svg",alt:"The Leadenhall Works"}),e.default.createElement("button",{className:`admin-rail-button${w?" admin-rail-button--active":""}`,type:"button",onClick:()=>n("/admin")},e.default.createElement(Ut,null)),e.default.createElement("button",{className:`admin-rail-button${!w&&!p?" admin-rail-button--active":""}`,type:"button",onClick:()=>n("/admin/pages/site-settings")},e.default.createElement(Bt,null)),e.default.createElement("button",{className:`admin-rail-button${p?" admin-rail-button--active":""}`,type:"button",onClick:()=>n("/admin/pages/media-library")},e.default.createElement(Rt,null)),e.default.createElement("div",{className:"admin-rail-spacer"}),e.default.createElement("div",{className:"admin-avatar",ref:E},e.default.createElement("button",{className:"admin-avatar__button",type:"button",onClick:()=>f(c=>!c)},y),s?e.default.createElement("div",{className:"admin-avatar__menu"},e.default.createElement("button",{type:"button",onClick:()=>{f(!1),n("/admin/pages/account")}},"Account"),e.default.createElement("button",{type:"button",onClick:()=>{f(!1),window.location.assign("/admin/logout")}},"Sign out")):null)),v?e.default.createElement("div",{className:"admin-sidebar-panel"},e.default.createElement("div",{className:"admin-sidebar-header"},"Content Manager"),e.default.createElement("div",{className:"admin-sidebar-body"},e.default.createElement("div",{className:"admin-search"},e.default.createElement("input",{type:"text",placeholder:"Search",value:d,onChange:c=>u(c.target.value)})),e.default.createElement("div",{className:"admin-group"},e.default.createElement("div",{className:"admin-group__head"},e.default.createElement("span",{className:"admin-group__label"},"Collection Types"),e.default.createElement("span",{className:"admin-group__count"},h.length)),h.map(c=>e.default.createElement("button",{key:c.id,className:`admin-nav-link${c.selected?" admin-nav-link--selected":""}`,type:"button",onClick:()=>n(c.href)},e.default.createElement("span",{className:"admin-nav-link__text"},c.label)))),e.default.createElement("div",{className:"admin-group"},e.default.createElement("div",{className:"admin-group__head"},e.default.createElement("span",{className:"admin-group__label"},"Customers"),e.default.createElement("span",{className:"admin-group__count"},_.length)),_.map(c=>e.default.createElement("button",{key:c.id,className:`admin-nav-link${c.selected?" admin-nav-link--selected":""}`,type:"button",onClick:()=>n(c.href)},e.default.createElement("span",{className:"admin-nav-link__text"},c.label)))),e.default.createElement("div",{className:"admin-group"},e.default.createElement("div",{className:"admin-group__head"},e.default.createElement("span",{className:"admin-group__label"},"Orders"),e.default.createElement("span",{className:"admin-group__count"},x.length+(m?1:0))),x.map(c=>e.default.createElement("button",{key:c.id,className:`admin-nav-link${c.selected?" admin-nav-link--selected":""}`,type:"button",onClick:()=>n(c.href)},e.default.createElement("span",{className:"admin-nav-link__text"},c.label))),m&&e.default.createElement("button",{className:`admin-nav-link${l?" admin-nav-link--selected":""}`,type:"button",onClick:()=>n(fa)},e.default.createElement("span",{className:"admin-nav-link__text"},"Refund Requests"),b>0&&e.default.createElement("span",{className:"admin-nav-link__icon",style:{width:"auto",fontSize:"0.6875rem",fontWeight:700,color:"#c72e3a"}},b))),e.default.createElement("div",{className:"admin-group"},e.default.createElement("div",{className:"admin-group__head"},e.default.createElement("span",{className:"admin-group__label"},"Single Types"),e.default.createElement("span",{className:"admin-group__count"},S.length)),S.map(c=>e.default.createElement("button",{key:c.id,className:`admin-nav-link${c.selected?" admin-nav-link--selected":""}`,type:"button",onClick:()=>n(c.href)},e.default.createElement("span",{className:"admin-nav-link__text"},c.label)))))):null))}function Ht(){const a=window.__APP_STATE__??{},t=xe.useSelector(r=>r.branding),n=a.errorMessage;return e.default.createElement(A.Box,{variant:"grey",height:"100%",display:"flex",alignItems:"center",justifyContent:"center",p:"xl",style:{background:"linear-gradient(135deg, #f4efe8 0%, #e8dccf 45%, #d9c4ab 100%)"}},e.default.createElement(A.Box,{bg:"white",width:["100%","100%","960px"],minHeight:"560px",display:"flex",boxShadow:"card",borderRadius:"xl",overflow:"hidden"},e.default.createElement(A.Box,{width:["0","0","44%"],display:["none","none","flex"],flexDirection:"column",justifyContent:"space-between",p:"xxl",style:{background:"linear-gradient(180deg, #0f0f0f 0%, #1f1f1f 100%)",color:"#f5f1ea"}},e.default.createElement(A.Box,null,e.default.createElement("img",{src:"/admin-assets/logo.svg",alt:t.companyName,style:{width:72,height:72,objectFit:"contain",marginBottom:24}}),e.default.createElement(A.H2,{color:"white",marginBottom:"lg"},"Client Content Portal"),e.default.createElement(A.Text,{color:"grey40"},"Manage the same client-facing content surface used by the live site.")),e.default.createElement(A.Text,{color:"grey50"},"The Leadenhall Works")),e.default.createElement(A.Box,{as:"form",action:a.action,method:"POST",flexGrow:1,p:"xxl",display:"flex",flexDirection:"column",justifyContent:"center"},e.default.createElement(A.Box,{mb:"xxl"},e.default.createElement("img",{src:"/admin-assets/logo.svg",alt:t.companyName,style:{width:64,height:64,objectFit:"contain",marginBottom:20}}),e.default.createElement(A.H2,{margin:"0"},"Sign in"),e.default.createElement(A.Text,{color:"grey60"},"Client editor access for The Leadenhall Works.")),n?e.default.createElement(A.MessageBox,{variant:"danger",mb:"lg"},n):null,e.default.createElement(A.FormGroup,null,e.default.createElement(A.Label,{required:!0},"Email"),e.default.createElement(A.Input,{name:"email",placeholder:"client@leadenhallworks.com"})),e.default.createElement(A.FormGroup,null,e.default.createElement(A.Label,{required:!0},"Password"),e.default.createElement(A.Input,{type:"password",name:"password",placeholder:"Enter password",autoComplete:"current-password"})),e.default.createElement(A.Box,{mt:"xl"},e.default.createElement(A.Button,{variant:"primary",size:"lg"},"Log in")))))}function Wt(){return null}AdminJS.UserComponents={},AdminJS.UserComponents.Dashboard=$a,AdminJS.UserComponents.CollectionManager=at,AdminJS.UserComponents.ContentPageEditor=Nt,AdminJS.UserComponents.MediaLibrary=Pt,AdminJS.UserComponents.AccountSettings=Tt,AdminJS.UserComponents.RefundRequests=$t,AdminJS.UserComponents.Sidebar=qt,AdminJS.UserComponents.Login=Ht,AdminJS.UserComponents.TopBar=Wt})(React,ReactRouter,AdminJS,AdminJSDesignSystem,ReactRedux);
