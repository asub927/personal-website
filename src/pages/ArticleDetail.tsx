import { ArticleWithAnnotations } from '../components/annotations/ArticleWithAnnotations';
import { Article, Annotation } from '../types';

const ArticleDetail = () => {
  // Sample article data with rich content
  const article: Article = {
    id: 'sample-article',
    title: 'The Future of Digital Transformation: Strategies for Sustainable Growth',
    author: 'Sarah Mitchell',
    publishedDate: '2024-11-15',
    content: `
      <p class="text-lg leading-relaxed mb-6">
        In today's rapidly evolving business landscape, digital transformation has become 
        more than just a buzzword—it's a critical imperative for organizations seeking to 
        remain competitive and relevant. However, the path to successful transformation is 
        fraught with challenges that require careful navigation and strategic planning.
      </p>

      <h2 class="text-2xl font-bold mt-8 mb-4">Understanding the Digital Imperative</h2>
      
      <p class="leading-relaxed mb-6">
        Digital transformation encompasses far more than simply adopting new technologies. 
        It represents a fundamental shift in how organizations operate, deliver value to 
        customers, and compete in the marketplace. According to recent research, companies 
        that successfully implement digital strategies see an average revenue increase of 
        23% over three years.
      </p>

      <p class="leading-relaxed mb-6">
        The key to successful transformation lies in understanding that technology is an 
        enabler, not the end goal. Organizations must focus on reimagining their business 
        models, processes, and customer experiences through the lens of digital capabilities.
      </p>

      <h2 class="text-2xl font-bold mt-8 mb-4">Core Pillars of Transformation</h2>

      <p class="leading-relaxed mb-4">
        Our research has identified four critical pillars that underpin successful digital 
        transformation initiatives:
      </p>

      <ul class="list-disc pl-6 mb-6 space-y-2">
        <li class="leading-relaxed">
          <strong>Customer-Centric Design:</strong> Placing customer needs and experiences 
          at the center of all digital initiatives
        </li>
        <li class="leading-relaxed">
          <strong>Agile Operations:</strong> Building flexible, responsive organizational 
          structures that can adapt quickly to change
        </li>
        <li class="leading-relaxed">
          <strong>Data-Driven Decision Making:</strong> Leveraging analytics and insights 
          to inform strategy and operations
        </li>
        <li class="leading-relaxed">
          <strong>Technology Modernization:</strong> Updating legacy systems and adopting 
          cloud-native architectures
        </li>
      </ul>

      <h2 class="text-2xl font-bold mt-8 mb-4">The Role of Leadership</h2>

      <p class="leading-relaxed mb-6">
        Leadership commitment is perhaps the most critical factor in transformation success. 
        Leaders must not only champion digital initiatives but also model the behaviors and 
        mindsets required for change. This includes embracing experimentation, accepting 
        calculated risks, and fostering a culture of continuous learning.
      </p>

      <p class="leading-relaxed mb-6">
        Organizations with strong digital leadership are 2.5 times more likely to achieve 
        their transformation goals. These leaders understand that transformation is a journey, 
        not a destination, and they invest in building capabilities that will sustain change 
        over the long term.
      </p>

      <h2 class="text-2xl font-bold mt-8 mb-4">Measuring Success</h2>

      <p class="leading-relaxed mb-6">
        Effective measurement frameworks are essential for tracking progress and demonstrating 
        value. Organizations should establish clear metrics that align with strategic objectives, 
        including both leading indicators (such as employee adoption rates) and lagging indicators 
        (such as revenue growth and customer satisfaction).
      </p>

      <p class="leading-relaxed mb-6">
        The most successful transformations are those that balance short-term wins with long-term 
        strategic goals, creating momentum while building sustainable capabilities for the future.
      </p>

      <h2 class="text-2xl font-bold mt-8 mb-4">Looking Ahead</h2>

      <p class="leading-relaxed mb-6">
        As we look to the future, the pace of technological change shows no signs of slowing. 
        Emerging technologies like artificial intelligence, blockchain, and quantum computing 
        promise to unlock new possibilities and disrupt existing business models. Organizations 
        that build strong digital foundations today will be best positioned to capitalize on 
        these opportunities tomorrow.
      </p>

      <p class="leading-relaxed">
        The journey of digital transformation is ongoing, requiring continuous adaptation and 
        evolution. By focusing on the fundamentals—customer value, organizational agility, 
        data-driven insights, and modern technology—organizations can navigate this journey 
        successfully and build sustainable competitive advantages for the digital age.
      </p>
    `,
  };

  // Sample annotations demonstrating different types
  const annotations: Annotation[] = [
    {
      id: 'annotation-1',
      title: 'Digital Transformation Defined',
      content: `Digital transformation is the integration of digital technology into all areas 
        of a business, fundamentally changing how organizations operate and deliver value to 
        customers. It's also a cultural change that requires organizations to continually 
        challenge the status quo, experiment, and get comfortable with failure.`,
      position: 200,
      metadata: {
        type: 'definition',
        source: 'Industry Standard Definition',
      },
    },
    {
      id: 'annotation-2',
      title: 'Research Methodology',
      content: `This statistic is based on a comprehensive study of 500+ enterprises across 
        multiple industries over a three-year period (2021-2024). The research employed a 
        mixed-methods approach combining quantitative financial analysis with qualitative 
        interviews of C-suite executives and transformation leaders.`,
      position: 450,
      metadata: {
        type: 'reference',
        author: 'Global Digital Research Institute',
        link: 'https://example.com/research',
      },
    },
    {
      id: 'annotation-3',
      title: 'The Technology Paradox',
      content: `While technology is essential for digital transformation, focusing solely on 
        technology adoption often leads to failure. Studies show that 70% of transformation 
        initiatives fail due to organizational and cultural factors rather than technical 
        limitations. This highlights the importance of addressing people, processes, and 
        culture alongside technology investments.`,
      position: 700,
      metadata: {
        type: 'insight',
        author: 'Dr. James Chen',
        source: 'Transformation Leadership Review',
      },
    },
    {
      id: 'annotation-4',
      title: 'Agile at Scale',
      content: `Agile operations extend beyond software development to encompass the entire 
        organization. This includes adopting agile principles in strategy, budgeting, and 
        organizational design. Companies implementing enterprise agility report 30% faster 
        time-to-market and 25% improvement in employee engagement.`,
      position: 950,
      metadata: {
        type: 'note',
        source: 'Agile Enterprise Framework',
      },
    },
    {
      id: 'annotation-5',
      title: 'Leadership Impact Study',
      content: `This finding comes from a longitudinal study tracking 300 transformation 
        initiatives across Fortune 1000 companies. The research identified that organizations 
        with CEOs who personally championed digital initiatives and allocated at least 20% 
        of their time to transformation activities achieved significantly higher success rates.`,
      position: 1350,
      metadata: {
        type: 'reference',
        author: 'Executive Leadership Institute',
        link: 'https://example.com/leadership-study',
      },
    },
    {
      id: 'annotation-6',
      title: 'Emerging Technology Landscape',
      content: `The convergence of AI, blockchain, and quantum computing represents a 
        paradigm shift in computational capabilities. Organizations should begin building 
        foundational knowledge and experimental capabilities in these areas now, even if 
        full-scale implementation is years away. Early movers in previous technology waves 
        (cloud, mobile) captured disproportionate market advantages.`,
      position: 1750,
      metadata: {
        type: 'insight',
        author: 'Technology Futures Lab',
        source: 'Emerging Tech Quarterly',
      },
    },
  ];

  return (
    <div className="min-h-screen bg-white py-8 md:py-12 lg:py-16">
      <ArticleWithAnnotations article={article} annotations={annotations} />
    </div>
  );
};

export default ArticleDetail;
