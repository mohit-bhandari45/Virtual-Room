import React from 'react'
import FloatingCard from './FloatingCard'
import { ChevronRight } from 'lucide-react'

const CTA = ({ isVisible }: { isVisible: boolean }) => {
  return (
    <FloatingCard isVisible={isVisible} delay={200}>
        <div className="relative z-10 max-w-4xl mx-auto px-6 pb-20 text-center">
          <div className="bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-3xl p-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Transform Your Virtual Meetings?
            </h2>
            <p className="text-xl text-gray-400 mb-8">
              Join thousands of teams already using VirtRoom to revolutionize their remote collaboration.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="group bg-white text-black px-8 py-4 rounded-full font-semibold flex items-center justify-center hover:bg-gray-100 transition-all transform duration-500 cursor-pointer hover:scale-105 shadow-2xl">
                Create Your Room
                <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="border border-white/30 text-white px-8 py-4 rounded-full font-semibold hover:bg-white/10 transition-all backdrop-blur-sm">
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </FloatingCard>
  )
}

export default CTA