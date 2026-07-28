"use client";

import { X, Ruler, CheckCircle2 } from "lucide-react";

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  category?: string;
}

export default function SizeGuideModal({ isOpen, onClose, category }: SizeGuideModalProps) {
  if (!isOpen) return null;

  const isMens = category?.toLowerCase().includes("men");

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-2xl bg-white shadow-2xl rounded-xs overflow-hidden z-10 animate-fade-in">
          {/* Header */}
          <div className="p-5 bg-stone-900 text-white flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Ruler size={20} className="text-amber-400" />
              <div>
                <h3 className="font-serif text-lg tracking-widest uppercase font-bold">
                  Fashion Galleria Size Guide
                </h3>
                <p className="text-[10px] text-stone-300 uppercase tracking-wider">
                  Sri Lankan & International Standard Fit
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-stone-300 hover:text-white rounded-full hover:bg-stone-800 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto custom-scrollbar">
            {/* Table */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900 mb-3 flex items-center justify-between">
                <span>{isMens ? "Men's Apparel Size Chart (Inches)" : "Women's Dress & Tops Size Chart"}</span>
                <span className="text-[10px] text-amber-800 font-semibold">Standard Ceylon Fit</span>
              </h4>

              <div className="overflow-x-auto border border-stone-200 rounded-xs">
                <table className="w-full text-xs text-left text-stone-700">
                  <thead className="bg-stone-100 uppercase tracking-wider text-[10px] text-stone-900 border-b border-stone-200 font-bold">
                    <tr>
                      <th className="px-4 py-3">Size Tag</th>
                      <th className="px-4 py-3">{isMens ? "Chest (in)" : "UK Size"}</th>
                      <th className="px-4 py-3">{isMens ? "Waist (in)" : "Bust (in)"}</th>
                      <th className="px-4 py-3">{isMens ? "Neck (in)" : "Waist (in)"}</th>
                      <th className="px-4 py-3">{isMens ? "Sleeve (in)" : "Hips (in)"}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-200 font-medium">
                    {isMens ? (
                      <>
                        <tr className="hover:bg-amber-50/50">
                          <td className="px-4 py-2.5 font-bold text-stone-900">S</td>
                          <td className="px-4 py-2.5">36 - 38&quot;</td>
                          <td className="px-4 py-2.5">30 - 32&quot;</td>
                          <td className="px-4 py-2.5">14.5&quot;</td>
                          <td className="px-4 py-2.5">33&quot;</td>
                        </tr>
                        <tr className="hover:bg-amber-50/50">
                          <td className="px-4 py-2.5 font-bold text-stone-900">M</td>
                          <td className="px-4 py-2.5">39 - 41&quot;</td>
                          <td className="px-4 py-2.5">33 - 35&quot;</td>
                          <td className="px-4 py-2.5">15.5&quot;</td>
                          <td className="px-4 py-2.5">34&quot;</td>
                        </tr>
                        <tr className="hover:bg-amber-50/50">
                          <td className="px-4 py-2.5 font-bold text-stone-900">L</td>
                          <td className="px-4 py-2.5">42 - 44&quot;</td>
                          <td className="px-4 py-2.5">36 - 38&quot;</td>
                          <td className="px-4 py-2.5">16.5&quot;</td>
                          <td className="px-4 py-2.5">35&quot;</td>
                        </tr>
                        <tr className="hover:bg-amber-50/50">
                          <td className="px-4 py-2.5 font-bold text-stone-900">XL</td>
                          <td className="px-4 py-2.5">45 - 47&quot;</td>
                          <td className="px-4 py-2.5">39 - 41&quot;</td>
                          <td className="px-4 py-2.5">17.5&quot;</td>
                          <td className="px-4 py-2.5">36&quot;</td>
                        </tr>
                        <tr className="hover:bg-amber-50/50">
                          <td className="px-4 py-2.5 font-bold text-stone-900">XXL</td>
                          <td className="px-4 py-2.5">48 - 50&quot;</td>
                          <td className="px-4 py-2.5">42 - 44&quot;</td>
                          <td className="px-4 py-2.5">18.5&quot;</td>
                          <td className="px-4 py-2.5">37&quot;</td>
                        </tr>
                      </>
                    ) : (
                      <>
                        <tr className="hover:bg-amber-50/50">
                          <td className="px-4 py-2.5 font-bold text-stone-900">XS</td>
                          <td className="px-4 py-2.5">UK 6</td>
                          <td className="px-4 py-2.5">31 - 32&quot;</td>
                          <td className="px-4 py-2.5">24 - 25&quot;</td>
                          <td className="px-4 py-2.5">34 - 35&quot;</td>
                        </tr>
                        <tr className="hover:bg-amber-50/50">
                          <td className="px-4 py-2.5 font-bold text-stone-900">S</td>
                          <td className="px-4 py-2.5">UK 8</td>
                          <td className="px-4 py-2.5">33 - 34&quot;</td>
                          <td className="px-4 py-2.5">26 - 27&quot;</td>
                          <td className="px-4 py-2.5">36 - 37&quot;</td>
                        </tr>
                        <tr className="hover:bg-amber-50/50">
                          <td className="px-4 py-2.5 font-bold text-stone-900">M</td>
                          <td className="px-4 py-2.5">UK 10</td>
                          <td className="px-4 py-2.5">35 - 36&quot;</td>
                          <td className="px-4 py-2.5">28 - 29&quot;</td>
                          <td className="px-4 py-2.5">38 - 39&quot;</td>
                        </tr>
                        <tr className="hover:bg-amber-50/50">
                          <td className="px-4 py-2.5 font-bold text-stone-900">L</td>
                          <td className="px-4 py-2.5">UK 12</td>
                          <td className="px-4 py-2.5">37 - 38&quot;</td>
                          <td className="px-4 py-2.5">30 - 31&quot;</td>
                          <td className="px-4 py-2.5">40 - 41&quot;</td>
                        </tr>
                        <tr className="hover:bg-amber-50/50">
                          <td className="px-4 py-2.5 font-bold text-stone-900">XL</td>
                          <td className="px-4 py-2.5">UK 14</td>
                          <td className="px-4 py-2.5">39 - 40&quot;</td>
                          <td className="px-4 py-2.5">32 - 33&quot;</td>
                          <td className="px-4 py-2.5">42 - 43&quot;</td>
                        </tr>
                        <tr className="hover:bg-amber-50/50">
                          <td className="px-4 py-2.5 font-bold text-stone-900">XXL</td>
                          <td className="px-4 py-2.5">UK 16</td>
                          <td className="px-4 py-2.5">41 - 43&quot;</td>
                          <td className="px-4 py-2.5">34 - 36&quot;</td>
                          <td className="px-4 py-2.5">44 - 46&quot;</td>
                        </tr>
                      </>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* How to Measure */}
            <div className="bg-stone-50 p-4 rounded-xs border border-stone-200 space-y-2">
              <h5 className="text-xs font-bold uppercase tracking-wider text-gray-900">
                How to Measure Your Fit
              </h5>
              <ul className="text-xs text-stone-600 space-y-1.5 list-disc pl-4">
                <li><strong className="text-stone-900">Bust/Chest:</strong> Measure under arms around the fullest part of your chest.</li>
                <li><strong className="text-stone-900">Waist:</strong> Measure around natural waistline, keeping tape comfortably loose.</li>
                <li><strong className="text-stone-900">Hips:</strong> Measure around the fullest part of your hips with feet together.</li>
              </ul>
            </div>

            {/* Exchange Policy Reminder */}
            <div className="flex items-center space-x-2 text-xs text-emerald-800 bg-emerald-50 p-3 rounded-xs border border-emerald-200">
              <CheckCircle2 size={16} className="shrink-0 text-emerald-700" />
              <span>
                <strong>Unsure about your size?</strong> Order with peace of mind. We offer a 7-day door-to-door courier exchange anywhere in Sri Lanka.
              </span>
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-stone-200 bg-stone-100 flex justify-end">
            <button
              onClick={onClose}
              className="bg-black text-white px-6 py-2 text-xs uppercase tracking-widest font-bold hover:bg-amber-700 transition-colors"
            >
              Got It
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
