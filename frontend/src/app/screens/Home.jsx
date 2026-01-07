import { ArrowRight, Zap } from "lucide-react";
import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Home = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user?.user);

  return (
    <div className="relative w-full min-h-screen bg-green-50 overflow-hidden">
      <section className="w-full py-16 sm:py-20 md:py-28 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col items-center text-center gap-6">

            <br /> <br /> <br />

            {/* Welcome */}
            {/* {user && (
              <h1 className="font-semibold text-lg sm:text-xl md:text-2xl text-gray-800">
                Welcome {user.username}
              </h1>
            )} */}

            {/* Badge */}
            <Badge
              variant="secondary"
              className="flex items-center gap-1 text-green-800 border border-green-200 px-3 py-1 text-xs sm:text-sm"
            >
              <Zap className="w-3 h-3" />
              New: AI-powered note organization
            </Badge>

            {/* Heading */}
            <h1 className="text-green-600 font-bold tracking-tight
              text-2xl
              sm:text-3xl
              md:text-4xl
              lg:text-5xl
              xl:text-6xl"
            >
              Your thoughts, organized and accessible
              <span className="text-gray-800"> everywhere</span>
            </h1>

            {/* Description */}
            <p className="max-w-[700px] text-muted-foreground
              text-sm
              sm:text-base
              md:text-lg"
            >
              Capture ideas, organize thoughts, and collaborate seamlessly.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <Button
                onClick={() => navigate("/create-todo")}
                size="lg"
                className="h-12 px-8 bg-green-600 hover:bg-green-500 w-full sm:w-auto"
              >
                Start Taking Notes
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="h-12 px-8 bg-white text-green-800 w-full sm:w-auto"
              >
                Watch Demo
              </Button>
            </div>

            {/* Footer text */}
            <p className="text-xs sm:text-sm text-green-800 mt-2">
              Free forever • No credit card required • 2 minutes setup
            </p>

          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
