import { Link } from "wouter";
import { Facebook, Twitter, Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-lg">
                ICH
              </div>
              <span className="font-display font-bold text-xl tracking-tight">
                Innovation<span className="text-primary"> Community </span> Hub
              </span>
            </div>
            <p className="text-secondary-foreground/80 leading-relaxed mb-6">
              Empowering communities through digital innovation, skill development, and creative expression. Join us in building a brighter future.
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-primary transition-colors"><Facebook className="w-5 h-5" /></a>
              <a href="#" className="hover:text-primary transition-colors"><Twitter className="w-5 h-5" /></a>
              <a href="#" className="hover:text-primary transition-colors"><Instagram className="w-5 h-5" /></a>
              <a href="#" className="hover:text-primary transition-colors"><Linkedin className="w-5 h-5" /></a>
            </div>
          </div>

          <div>
            <h3 className="font-display font-bold text-lg mb-6 text-white">Quick Links</h3>
            <ul className="space-y-4">
              <li><Link href="/programs"><a className="hover:text-primary transition-colors">Our Programs</a></Link></li>
              <li><Link href="/communities"><a className="hover:text-primary transition-colors">Communities</a></Link></li>
              <li><Link href="/talent"><a className="hover:text-primary transition-colors">Talent Discovery</a></Link></li>
              <li><Link href="/about"><a className="hover:text-primary transition-colors">About Us</a></Link></li>
              <li><Link href="/blog"><a className="hover:text-primary transition-colors">Latest News</a></Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-display font-bold text-lg mb-6 text-white">Programs</h3>
            <ul className="space-y-4">
              <li><Link href="#"><a className="hover:text-primary transition-colors">Digital Skills</a></Link></li>
              <li><Link href="#"><a className="hover:text-primary transition-colors">Entrepreneurship</a></Link></li>
              <li><Link href="#"><a className="hover:text-primary transition-colors">Vocational Training</a></Link></li>
              <li><Link href="#"><a className="hover:text-primary transition-colors">Creative Arts</a></Link></li>
              <li><Link href="#"><a className="hover:text-primary transition-colors">Tech Startups</a></Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-display font-bold text-lg mb-6 text-white">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-1" />
                <span>123 Innovation Drive,<br />Tech District, City 10001</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <span>+256 7xx xxx xxx</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <span>ich@innovationhub.org</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-secondary-foreground/60">
          <p>© 2024 Innovation Community Hub. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
