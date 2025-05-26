
import ChatBubble from "@/components/ChatBubble";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center space-y-6">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-orange-500 to-orange-700 bg-clip-text text-transparent">
            Chatty North
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Experience the power of intelligent conversation with our advanced chat platform. 
            Connect, communicate, and collaborate like never before.
          </p>
          <div className="flex justify-center space-x-4">
            <button className="bg-gradient-to-r from-orange-400 to-orange-600 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105">
              Get Started
            </button>
            <button className="border-2 border-gray-300 text-gray-700 px-8 py-3 rounded-full font-semibold hover:border-orange-500 hover:text-orange-500 transition-all duration-300">
              Learn More
            </button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-orange-600 rounded-lg flex items-center justify-center mb-4">
              <span className="text-white text-xl">💬</span>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-800">Smart Conversations</h3>
            <p className="text-gray-600">
              Engage in intelligent conversations powered by advanced AI technology.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-orange-600 rounded-lg flex items-center justify-center mb-4">
              <span className="text-white text-xl">⚡</span>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-800">Lightning Fast</h3>
            <p className="text-gray-600">
              Get instant responses and real-time communication experiences.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-orange-600 rounded-lg flex items-center justify-center mb-4">
              <span className="text-white text-xl">🌟</span>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-800">Premium Experience</h3>
            <p className="text-gray-600">
              Enjoy a seamless and intuitive chat experience designed for you.
            </p>
          </div>
        </div>
      </div>

      {/* Chat Bubble Component */}
      <ChatBubble />
    </div>
  );
};

export default Index;
