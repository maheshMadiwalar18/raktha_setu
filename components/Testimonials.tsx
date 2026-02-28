import React from 'react';
import { Quote } from 'lucide-react';

const FALLBACK_AVATAR = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='96' height='96' viewBox='0 0 96 96'%3E%3Crect width='96' height='96' rx='48' fill='%23e2e8f0'/%3E%3Cpath d='M48 48c8.8 0 16-7.2 16-16S56.8 16 48 16s-16 7.2-16 16 7.2 16 16 16zm0 8c-14.4 0-26 9.6-26 21.3V80h52v-2.7C74 65.6 62.4 56 48 56z' fill='%2394a3b8'/%3E%3C/svg%3E";

const ReviewCard: React.FC<{ name: string; role: string; quote: string; image: string }> = ({ name, role, quote, image }) => (
  <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
    <Quote className="w-8 h-8 text-brand-200 mb-4" />
    <p className="text-slate-600 mb-6 leading-relaxed italic">"{quote}"</p>
    <div className="flex items-center gap-4">
      <img src={image} alt={name} className="w-12 h-12 rounded-full object-cover ring-2 ring-brand-100" onError={(e) => { e.currentTarget.src = FALLBACK_AVATAR; }} />
      <div>
        <h5 className="font-bold text-slate-900">{name}</h5>
        <span className="text-xs text-brand-600 font-semibold uppercase tracking-wide">{role}</span>
      </div>
    </div>
  </div>
);

const Testimonials: React.FC = () => {
  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900">Stories from people like you</h2>
          <p className="text-slate-500 mt-2">A few words from donors, recipients, and volunteers.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <ReviewCard 
            name="Rohan Gupta"
            role="Regular Donor"
            quote="The app makes it so easy to find donation camps. I've donated 5 times this year thanks to the notifications!"
            image="https://picsum.photos/100/100?random=10"
          />
          <ReviewCard 
            name="Ananya Iyer"
            role="Recipient"
            quote="When my father needed surgery, we were panicked. RakhtSetu connected us to an O- donor in 20 minutes. Forever grateful."
            image="https://picsum.photos/100/100?random=11"
          />
          <ReviewCard 
            name="Vikram Singh"
            role="Volunteer"
            quote="Volunteering with RakhtSetu has been life-changing. Seeing the impact of technology on saving lives is incredible."
            image="https://picsum.photos/100/100?random=12"
          />
        </div>
      </div>
    </section>
  );
};

export default Testimonials;