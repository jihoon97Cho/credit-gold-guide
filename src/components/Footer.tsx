import { COMPANY } from "@/lib/constants";
import logo from "@/assets/logo.png";

const Footer = () => (
  <footer className="border-t border-border bg-card py-12">
    <div className="container mx-auto px-4">
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <img src={logo} alt={COMPANY.name} className="mb-3 h-10 w-auto" />
          <p className="text-sm text-muted-foreground">{COMPANY.name}</p>
        </div>
        <div>
          <h4 className="mb-3 font-bold text-foreground">Contact</h4>
          <p className="text-sm text-muted-foreground">
            <a href={`tel:${COMPANY.phone}`} className="hover:text-primary">{COMPANY.phoneFormatted}</a>
          </p>
          <p className="text-sm text-muted-foreground">
            <a href={`mailto:${COMPANY.email}`} className="hover:text-primary">{COMPANY.email}</a>
          </p>
        </div>
        <div>
          <h4 className="mb-3 font-bold text-foreground">Service Area</h4>
          <p className="text-sm text-muted-foreground">{COMPANY.serviceArea}</p>
        </div>
        <div>
          <h4 className="mb-3 font-bold text-foreground">Legal</h4>
          <p className="text-sm text-muted-foreground hover:text-primary"><a href="#privacy">Privacy Policy</a></p>
          <p className="text-sm text-muted-foreground hover:text-primary"><a href="#terms">Terms of Service</a></p>
        </div>
      </div>

      <div className="mt-10 border-t border-border pt-6">
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} {COMPANY.name}. All rights reserved. Credit repair services are provided in accordance with the Credit Repair Organizations Act (CROA). Results may vary. No guarantee of specific outcomes is implied.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
