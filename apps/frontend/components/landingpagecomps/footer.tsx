import React from 'react'
import FloatingCard from './FloatingCard'
import { Video } from 'lucide-react'

const Footer = ({ isVisible }: { isVisible: boolean }) => {
  return (
    <FloatingCard isVisible={isVisible} delay={200}>
        <footer className="relative z-10 border-t border-white/10 px-6 py-8">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-6 h-6 bg-white rounded-md flex items-center justify-center">
                <Video className="w-4 h-4 text-black" />
              </div>
              <span className="font-semibold">VirtRoom</span>
            </div>
            <div className="flex space-x-6 text-gray-400">
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <a href="#" className="hover:text-white transition-colors">Support</a>
            </div>
          </div>
        </footer>
      </FloatingCard>
  )
}

export default Footer