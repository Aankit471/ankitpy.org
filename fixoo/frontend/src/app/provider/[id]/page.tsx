"use client";

import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Star, MapPin, Shield, Zap, ChevronLeft } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { getProviderById, getProviderReviews } from '@/lib/dbUtils';

export default function ProviderProfile() {
  const params = useParams();
  const id = params.id as string;
  const router = useRouter();

  const { data: provider, isLoading } = useQuery({
    queryKey: ['provider', id],
    queryFn: () => getProviderById(id),
    enabled: !!id,
  });

  const { data: reviews = [] } = useQuery({
    queryKey: ['reviews', id],
    queryFn: () => getProviderReviews(id),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-white/10 border-t-red-600 rounded-full animate-spin" />
      </div>
    );
  }

  if (!provider) {
    return (
      <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center px-5">
        <p className="text-xl font-bold mb-4">Provider not found</p>
        <button onClick={() => router.back()} className="text-red-500 font-medium">Go back</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      {/* Header */}
      <div className="relative h-56 bg-gradient-to-b from-red-600/30 to-[#050505]">
        <button onClick={() => router.back()} className="absolute top-14 left-5 glass p-2 rounded-xl z-10 border border-white/10">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div className="absolute bottom-0 left-0 right-0 px-5 pb-4 flex items-end gap-4">
          <div className="w-20 h-20 rounded-2xl bg-gradient-red flex items-center justify-center text-3xl font-bold overflow-hidden border-4 border-[#050505] glow-red-sm shrink-0">
            {provider.photo_url
              ? <img src={provider.photo_url} className="w-full h-full object-cover" alt={provider.full_name} />
              : <span className="text-white">{provider.full_name?.[0] || 'P'}</span>}
          </div>
          <div className="flex-1 pb-1">
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold">{provider.full_name}</h1>
              {provider.kyc_status === 'approved' && (
                <Shield className="w-4 h-4 text-green-400" />
              )}
            </div>
            <p className="text-red-500 font-semibold text-sm">{provider.service_type}</p>
            <div className="flex items-center gap-1 mt-0.5">
              <span className={`w-2 h-2 rounded-full ${provider.is_online ? 'bg-green-400' : 'bg-zinc-500'}`} />
              <span className="text-xs text-zinc-400">{provider.is_online ? 'Online Now' : 'Offline'}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="px-5 py-5 space-y-5 pb-24">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: 'Rating', value: provider.rating?.toFixed(1) || '4.8', icon: '⭐' },
            { label: 'Jobs Done', value: provider.jobs_completed || 0, icon: '✅' },
            { label: 'Exp. Years', value: provider.experience_years || 1, icon: '🏆' },
          ].map(s => (
            <div key={s.label} className="glass border border-white/5 rounded-2xl p-3 text-center">
              <p className="text-xl mb-0.5">{s.icon}</p>
              <p className="font-bold text-lg">{s.value}</p>
              <p className="text-xs text-zinc-400">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Price & Location */}
        <div className="glass border border-white/5 rounded-2xl p-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-zinc-400">
            <MapPin className="w-4 h-4" />
            <span className="text-sm">{provider.work_city || 'Mumbai'}</span>
          </div>
          <div className="text-right">
            <p className="text-xl font-bold text-red-500">₹{provider.price_per_hour || 299}</p>
            <p className="text-xs text-zinc-400">per hour</p>
          </div>
        </div>

        {/* Bio */}
        {provider.bio && (
          <div className="glass border border-white/5 rounded-2xl p-4">
            <h3 className="font-bold mb-2">About</h3>
            <p className="text-sm text-zinc-400 leading-relaxed">{provider.bio}</p>
          </div>
        )}

        {/* Reviews */}
        {reviews.length > 0 && (
          <div>
            <h3 className="font-bold mb-3">Reviews</h3>
            <div className="space-y-3">
              {reviews.map((r: any) => (
                <div key={r.id} className="glass border border-white/5 rounded-2xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-semibold text-sm">{r.user_name || 'Anonymous'}</p>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className={`w-3 h-3 ${i < (r.rating || 5) ? 'fill-yellow-400 text-yellow-400' : 'text-zinc-600'}`} />
                      ))}
                    </div>
                  </div>
                  {r.review_text && <p className="text-sm text-zinc-400">{r.review_text}</p>}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Book Button */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto p-4 bg-gradient-to-t from-black via-black to-transparent pt-10">
        <button
          onClick={() => router.push(`/booking/new?provider=${id}&service=${provider.service_type}`)}
          className="w-full bg-gradient-red text-white font-bold py-4 rounded-2xl text-base glow-red animate-pulse-glow flex items-center justify-center gap-2 shadow-2xl"
        >
          <Zap className="w-5 h-5" />
          Book {provider.full_name?.split(' ')[0] || 'Provider'} Now
        </button>
      </div>
    </div>
  );
}
