import { useState } from 'react';
import { DashboardView } from './DashboardView';
import { OrdersView } from './OrdersView';
import { OrganizationsView } from './OrganizationsView';
import { ProductsView } from './ProductsView';
import { CategoriesView } from './CategoriesView';
import { BrandsView } from './BrandsView';
import { InventoryView } from './InventoryView';
import { PricingView } from './PricingView';
import { PromotionsView } from './PromotionsView';
import { PaymentsView } from './PaymentsView';
import { TaxesView } from './TaxesView';
import { ShippingView } from './ShippingView';
import { UsersView } from './UsersView';
import { AuditLogView } from './AuditLogView';
import { B2BReportsView } from './B2BReportsView';
import { AdminReturnsView } from './AdminReturnsView';
import { AdminPrivacyView } from './AdminPrivacyView';
import { AdminReviewsView } from './AdminReviewsView';
import { AdminNotificationsView } from './AdminNotificationsView';
import { AdminPoliciesView } from './AdminPoliciesView';
import { SettingsView } from './SettingsView';
import { ReportsView } from './ReportsView';

type Section =
  | 'dashboard'
  | 'orders'
  | 'organizations'
  | 'products'
  | 'categories'
  | 'brands'
  | 'inventory'
  | 'pricing'
  | 'promotions'
  | 'payments'
  | 'taxes'
  | 'shipping'
  | 'reviews'
  | 'notifications'
  | 'policies'
  | 'users'
  | 'audit'
  | 'b2b'
  | 'returns'
  | 'privacy'
  | 'reports'
  | 'settings';

export function Portal({ token, onLogout }: { token: string; onLogout: () => void }) {
  const [view, setView] = useState<Section>('dashboard');

  return (
    <main className="portal">
      <aside className="sidebar">
        <a className="admin-mark" href="#dashboard">FLOW / WORKS <small>Admin</small></a>
        <nav aria-label="Admin sections">
          <button className={view === 'dashboard' ? 'active' : ''} onClick={() => setView('dashboard')} type="button">Dashboard</button>
          <button className={view === 'orders' ? 'active' : ''} onClick={() => setView('orders')} type="button">Orders</button>
          <button className={view === 'payments' ? 'active' : ''} onClick={() => setView('payments')} type="button">Payments</button>
          <button className={view === 'returns' ? 'active' : ''} onClick={() => setView('returns')} type="button">Returns</button>
          <button className={view === 'organizations' ? 'active' : ''} onClick={() => setView('organizations')} type="button">Organizations</button>
          <button className={view === 'b2b' ? 'active' : ''} onClick={() => setView('b2b')} type="button">B2B reports</button>
          <button className={view === 'products' ? 'active' : ''} onClick={() => setView('products')} type="button">Products</button>
          <button className={view === 'categories' ? 'active' : ''} onClick={() => setView('categories')} type="button">Categories</button>
          <button className={view === 'brands' ? 'active' : ''} onClick={() => setView('brands')} type="button">Brands</button>
          <button className={view === 'inventory' ? 'active' : ''} onClick={() => setView('inventory')} type="button">Inventory</button>
          <button className={view === 'pricing' ? 'active' : ''} onClick={() => setView('pricing')} type="button">Pricing</button>
          <button className={view === 'promotions' ? 'active' : ''} onClick={() => setView('promotions')} type="button">Promotions</button>
          <button className={view === 'taxes' ? 'active' : ''} onClick={() => setView('taxes')} type="button">Taxes</button>
          <button className={view === 'shipping' ? 'active' : ''} onClick={() => setView('shipping')} type="button">Shipping</button>
          <button className={view === 'reviews' ? 'active' : ''} onClick={() => setView('reviews')} type="button">Reviews</button>
          <button className={view === 'notifications' ? 'active' : ''} onClick={() => setView('notifications')} type="button">Notifications</button>
          <button className={view === 'policies' ? 'active' : ''} onClick={() => setView('policies')} type="button">Policies</button>
          <button className={view === 'users' ? 'active' : ''} onClick={() => setView('users')} type="button">Users &amp; roles</button>
          <button className={view === 'privacy' ? 'active' : ''} onClick={() => setView('privacy')} type="button">Privacy requests</button>
          <button className={view === 'reports' ? 'active' : ''} onClick={() => setView('reports')} type="button">Reports</button>
          <button className={view === 'audit' ? 'active' : ''} onClick={() => setView('audit')} type="button">Audit log</button>
          <button className={view === 'settings' ? 'active' : ''} onClick={() => setView('settings')} type="button">System settings</button>
        </nav>
        <button className="logout" type="button" onClick={onLogout}>Sign out</button>
      </aside>
      <section className="content">
        {view === 'dashboard' && <DashboardView token={token} />}
        {view === 'orders' && <OrdersView token={token} />}
        {view === 'payments' && <PaymentsView token={token} />}
        {view === 'returns' && <AdminReturnsView token={token} />}
        {view === 'organizations' && <OrganizationsView token={token} />}
        {view === 'b2b' && <B2BReportsView token={token} />}
        {view === 'products' && <ProductsView token={token} />}
        {view === 'categories' && <CategoriesView token={token} />}
        {view === 'brands' && <BrandsView token={token} />}
        {view === 'inventory' && <InventoryView token={token} />}
        {view === 'pricing' && <PricingView token={token} />}
        {view === 'promotions' && <PromotionsView token={token} />}
        {view === 'taxes' && <TaxesView token={token} />}
        {view === 'shipping' && <ShippingView token={token} />}
        {view === 'reviews' && <AdminReviewsView token={token} />}
        {view === 'notifications' && <AdminNotificationsView token={token} />}
        {view === 'policies' && <AdminPoliciesView token={token} />}
        {view === 'users' && <UsersView token={token} />}
        {view === 'privacy' && <AdminPrivacyView token={token} />}
        {view === 'reports' && <ReportsView token={token} />}
        {view === 'audit' && <AuditLogView token={token} />}
        {view === 'settings' && <SettingsView token={token} />}
      </section>
    </main>
  );
}

