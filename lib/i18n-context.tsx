"use client"

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react"

export type Locale = "en" | "zh"

interface I18nContextValue {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (key: string) => string
}

const I18nContext = createContext<I18nContextValue | null>(null)

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en")

  useEffect(() => {
    const stored = localStorage.getItem("Angelpro-locale")
    if (stored === "zh" || stored === "en") {
      setLocaleState(stored)
    }
  }, [])

  function setLocale(l: Locale) {
    setLocaleState(l)
    localStorage.setItem("Angelpro-locale", l)
  }

  function t(key: string): string {
    const dict = locale === "zh" ? zh : en
    return dict[key] ?? key
  }

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error("useI18n must be used within I18nProvider")
  return ctx
}

/* ──────────── English dictionary ──────────── */
const en: Record<string, string> = {
  // Nav
  "nav.home": "Home",
  "nav.technology": "Technology",
  "nav.pipeline": "Pipeline",
  "nav.news": "News",
  "nav.contact": "Contact",

  // Hero
  "hero.badge": "AI-Powered Drug Discovery",
  "hero.title": "AI-Driven Drug Discovery Across Small Molecules, Peptides & TCM",
  "hero.subtitle": "Integrating computational biology and machine learning to accelerate breakthrough therapies from discovery to IND",
  "hero.exploreTech": "Explore Technology",
  "hero.viewPipeline": "View Pipeline",

  // Logo band
  "logoBand.title": "Trusted by leading pharmaceutical companies and CRO partners",

  // Value props
  "valueProps.heading": "Transforming every stage of drug discovery",
  "valueProps.subtitle": "Our integrated platform accelerates the path from target to clinic",
  "valueProps.target.title": "Target Identification",
  "valueProps.target.desc": "AI algorithms analyze complex biological data to identify novel drug targets with unprecedented accuracy and speed.",
  "valueProps.lead.title": "Lead Optimization",
  "valueProps.lead.desc": "Generative chemistry designs and optimizes candidate molecules in weeks, not years, dramatically reducing development time.",
  "valueProps.clinical.title": "Clinical Success",
  "valueProps.clinical.desc": "Predict clinical outcomes early and reduce late-stage failures, improving the probability of success across your portfolio.",

  // Platform preview
  "platform.tag": "Our Platform",
  "platform.heading": "End-to-end AI infrastructure for drug discovery",
  "platform.desc": "Our proprietary platform integrates deep learning, generative AI, and computational chemistry into a unified workflow that connects target identification through clinical candidate selection.",
  "platform.feat1": "Multi-omics data integration & analysis",
  "platform.feat2": "AI-driven structure-based drug design",
  "platform.feat3": "Generative molecular optimization",
  "platform.feat4": "Real-time predictive toxicology",
  "platform.feat5": "Automated lead scoring & prioritization",
  "platform.learnMore": "Learn More",

  // Pipeline preview
  "pipelinePreview.tag": "Pipeline",
  "pipelinePreview.heading": "Advancing multiple programs across therapeutic areas",
  "pipelinePreview.progress": "Progress",
  "pipelinePreview.viewFull": "View Full Pipeline",

  // Pipeline program areas
  "area.smallMolecules": "Small Molecules",
  "area.peptides": "Peptides",
  "area.tcm": "TCM",

  // Pipeline program names
  "program.dfu12": "Diabetic Foot Ulcer (1.2)",
  "program.appetite": "Appetite Suppression",
  "program.epilepsy": "Epilepsy Program",

  // Pipeline stages
  "stage.discovery": "Discovery",
  "stage.leadOptimization": "Lead Optimization",
  "stage.preclinical": "Preclinical",
  "stage.indEnabling": "IND-Enabling",
  "stage.ind": "IND",
  "stage.indApplication": "IND Application",
  "stage.clinical1": "Clinical Phase 1",
  "stage.clinical2": "Clinical Phase 2",
  "stage.clinical3": "Clinical Phase 3",

  // News
  "news.tag": "Latest News",
  "news.heading": "Recent updates",
  "news.1.date": "January 15, 2026",
  "news.1.title": "Angelpro Advances Diabetic Foot Ulcer Program to IND Application",
  "news.1.summary": "Our lead small molecule program for Class 1.2 innovative drugs reaches IND-enabling stage, marking a major milestone in AI-driven drug repurposing.",
  "news.2.date": "December 8, 2025",
  "news.2.title": "AI-Designed Peptide Candidates Show Promising Results in Appetite Suppression",
  "news.2.summary": "Our peptide design platform generates novel candidates with improved selectivity and stability for weight management applications.",
  "news.3.date": "November 20, 2025",
  "news.3.title": "Angelpro Launches TCM Active Compound Screening Platform",
  "news.3.summary": "New AI-powered platform for identifying and validating active compounds in traditional Chinese medicine formulations.",
  "news.4.date": "October 5, 2025",
  "news.4.title": "Alzheimer's Disease Program Enters Lead Optimization Phase",
  "news.4.summary": "Our small molecule program leveraging structural optimization for Class 1.1 innovative drugs progresses into lead optimization.",

  // Careers
  "careers.heading": "Join our mission to transform drug discovery",
  "careers.desc": "We are assembling a world-class team of scientists and visionaries. Join us in scientific research and help us build the future of medicine.",
  "careers.cta": "Contact Us",

  // Image Carousel
  "carousel.home.title": "Explore Our Cutting-Edge Research",
  "carousel.home.desc": "Showcasing our research areas from cell biology to computational chemistry",
  "carousel.tech.title": "Our Technological Capabilities",
  "carousel.tech.desc": "Showcasing our core technology platforms from gene editing to protein folding",
  "carousel.pipeline.title": "The Science Behind Our Pipeline",
  "carousel.pipeline.desc": "Dive deeper into the science and technology behind our drug discovery process",
  "carousel.pipeline.overlayText": "Wet experiments, dry experiments, and AI prediction results match",
  "carousel.pipeline.image1": "HE staining score: Reflects the overall situation of tissue repair, inflammatory response, and structural integrity. Redder color indicates better granulation tissue formation.",
  "carousel.pipeline.image2": "Masson staining (collagen deposition) results show significantly reduced collagen precipitation, indicating that the drug acts during skin repair with less fibrosis and less scar formation.",
  "carousel.pipeline.image3": "F4/80+CD206+ double-positive cell proportion results suggest: M2 macrophages have repair effects in the late stage of immune response. The drug significantly promotes M2 polarization, indicating that the drug's action on the mouse immune environment may tend toward repair and anti-inflammatory effects.",
  "carousel.pipeline.image4": "F4/80+CD45+ double-positive cell proportion results suggest: M1 macrophages may be related to inflammatory response or immune activity. The drug shows a trend of inhibiting M1 polarization.",
  "carousel.pipeline.image5": "Flow cytometry results show that the drug can significantly enhance macrophage M2 polarization and inhibit M1 polarization.",
  "carousel.pipeline.image6": "Immunofluorescence results show that the drug can significantly enhance macrophage M2 polarization and inhibit M1 polarization.",
  "carousel.pipeline.image7": "Western blot results show significant inhibition of macrophage NF-κB, PI3K/AKT, and NLRP3 inflammasome pathway signaling expression.",
  "carousel.contact.title": "Our Research Achievements",
  "carousel.contact.desc": "Learn about our research progress and technological breakthroughs",

  // Footer
  "footer.desc": "AI-driven drug discovery across small molecules, peptides, and traditional Chinese medicine. Accelerating breakthrough therapies with artificial intelligence.",
  "footer.company": "Company",
  "footer.resources": "Resources",
  "footer.partnerships": "Partnerships",
  "footer.careers": "Careers",
  "footer.publications": "Publications",
  "footer.copyright": "Angelpro. All rights reserved.",
  "footer.privacy": "Privacy Policy",
  "footer.terms": "Terms of Service",

  // Technology page
  "tech.breadcrumb": "Technology",
  "tech.heroTitle": "Our Technologies",
  "tech.heroDesc": "Angelpro develops proprietary AI-driven drug discovery platforms spanning small molecules, peptides, and traditional Chinese medicine, each powered by purpose-built computational models and deep learning architectures.",

  // Small molecules platform
  "sm.platformTag": "Platform I",
  "sm.title": "Small Molecules",
  "sm.desc": "End-to-end AI capabilities for small molecule drug discovery, from repurposing existing drugs to designing novel chemical entities with optimized pharmacological profiles.",
  "sm.repurposing.tag": "Discovery",
  "sm.repurposing.title": "AI-Driven Drug Repurposing for Class 1.2 Innovative Drugs",
  "sm.repurposing.desc": "Our AI platform identifies new therapeutic indications for existing approved drugs by analyzing large-scale molecular interaction networks, clinical data, and multi-omics signatures. By leveraging deep learning models trained on drug-target binding profiles and disease pathology datasets, we uncover hidden pharmacological relationships that enable rapid repositioning of known compounds for novel indications, significantly reducing development timelines and de-risking the path to IND.",
  "sm.optimization.tag": "Optimization",
  "sm.optimization.title": "Structural Optimization for Class 1.1 Innovative Drugs",
  "sm.optimization.desc": "Our generative chemistry engine designs and optimizes novel molecular structures through iterative cycles of AI-guided modification. Starting from validated hit compounds, the platform applies structure-activity relationship (SAR) modeling, molecular property prediction, and synthetic accessibility scoring to systematically improve potency, selectivity, metabolic stability, and safety profiles, generating truly novel drug candidates with optimized pharmacological characteristics.",
  "sm.screening.tag": "Screening",
  "sm.screening.title": "Pharmacology-Constrained Screening",
  "sm.screening.desc": "A comprehensive in-silico screening platform that evaluates drug candidates across multiple pharmacological dimensions simultaneously, ensuring only the most promising compounds advance through the pipeline.",
  "sm.cap1": "Molecular physicochemical properties prediction",
  "sm.cap2": "Metabolic stability analysis",
  "sm.cap3": "ADMET property prediction",
  "sm.cap4": "Synthesizability prediction",
  "sm.cap5": "Target activity prediction",
  "sm.cap6": "Molecular docking simulations",
  "sm.cap7": "Phenotypic screening predictions",
  "sm.cap8": "Multi-target interaction assessment",
  "sm.cap9": "Molecular dynamics simulations",
  "sm.cap10": "Pathway analysis and network pharmacology",
  "sm.cap11": "QSAR modeling and prediction",
  
  // New small molecule modules
  "sm.kgRepurposing.tag": "Knowledge Graph",
  "sm.kgRepurposing.title": "Knowledge Graph and Biological Process-based Drug Repurposing System",
  "sm.kgRepurposing.desc": "Combining knowledge graph technology with biological process analysis to intelligently discover new uses for existing drugs, significantly improving drug repurposing efficiency.",
  
  "sm.kgPrediction.tag": "Function Prediction",
  "sm.kgPrediction.title": "Knowledge Graph-based Small Molecule Drug Function Prediction System",
  "sm.kgPrediction.desc": "Utilizing the multi-dimensional structure of knowledge graphs to accurately predict the biological functions, pathological mechanisms, and pharmacological properties of small molecule drugs.",
  
  "sm.multimodalMining.tag": "Multimodal",
  "sm.multimodalMining.title": "Next-generation Multimodal Small Molecule Function Mining System",
  "sm.multimodalMining.desc": "Integrating multi-modal data including structure, sequence, and chemical properties to deeply mine the potential functions and therapeutic value of small molecules.",
  
  "sm.3dOptimization.tag": "3D Optimization",
  "sm.3dOptimization.title": "3D Molecular Optimization Algorithm Based on Target and Reference Molecules",
  "sm.3dOptimization.desc": "Based on target structure and reference molecules, optimize the 3D structure of molecules through AI algorithms to improve drug selectivity and effectiveness.",

  // Peptides platform
  "pep.platformTag": "Platform II",
  "pep.title": "Peptides",
  "pep.desc": "AI-driven peptide discovery and optimization platform, leveraging deep learning for sequence design, stability engineering, and pharmacological screening of peptide therapeutics.",
  "pep.design.tag": "Design & Optimization",
  "pep.design.title": "Peptide Design & Optimization",
  "pep.design.desc": "Our AI-powered peptide engineering platform combines sequence-based deep learning with structural modeling to design novel peptide therapeutics. The system generates optimized peptide sequences with enhanced target binding affinity, improved metabolic stability, and favorable pharmacokinetic profiles. Through iterative rounds of computational design and scoring, we rapidly explore the vast peptide sequence space to identify candidates with the optimal balance of potency, selectivity, and drug-like properties.",
  "pep.screening.tag": "Screening",
  "pep.screening.title": "Peptide Screening Capabilities",
  "pep.screening.desc": "A comprehensive computational screening pipeline tailored specifically for peptide therapeutics, evaluating candidates across all critical pharmacological parameters to ensure only the most viable peptides advance to preclinical development.",
  "pep.cap1": "Peptide-target binding affinity prediction",
  "pep.cap2": "Stability and half-life optimization",
  "pep.cap3": "Membrane permeability assessment",
  "pep.cap4": "Immunogenicity risk profiling",
  "pep.cap5": "Protease resistance modeling",
  "pep.cap6": "Cyclization strategy optimization",
  "pep.cap7": "Cell penetration prediction",
  "pep.cap8": "Multi-target selectivity screening",
  "pep.cap9": "Conformational analysis and dynamics",
  "pep.cap10": "Structure-activity relationship mapping",
  "pep.cap11": "Toxicity and safety profiling",
  
  // New peptide modules
  "pep.targetBased.tag": "Target-based",
  "pep.targetBased.title": "Target-based Peptide Drug Generation",
  "pep.targetBased.desc": "Based on target structure, generate high-affinity peptide drug molecules through AI algorithms to improve drug selectivity and efficacy.",
  
  "pep.iptmOptimization.tag": "IPTM Optimization",
  "pep.iptmOptimization.title": "Surface IPTM-based Peptide Drug Optimization",
  "pep.iptmOptimization.desc": "Using surface IPTM (Interface Protein-Ligand Interaction) analysis to optimize the binding interface between peptides and targets, enhancing drug stability and affinity.",
  
  "pep.evolutionaryOptimization.tag": "Evolutionary",
  "pep.evolutionaryOptimization.title": "Evolutionary Algorithm-based Peptide Optimization",
  "pep.evolutionaryOptimization.desc": "Through simulating biological evolution processes, iteratively optimize peptide sequences and structures to generate peptide drugs with superior pharmacological properties.",

  // TCM platform
  "tcm.platformTag": "Platform III",
  "tcm.title": "Traditional Chinese Medicine",
  "tcm.desc": "AI-powered platform for modernizing traditional Chinese medicine drug discovery, combining ancient pharmacological knowledge with cutting-edge computational methods for active compound identification and new drug development.",
  "tcm.discovery.tag": "Discovery",
  "tcm.discovery.title": "Class 2.3 Modified New Drug Discovery",
  "tcm.discovery.desc": "Our TCM discovery platform applies AI-powered natural language processing and knowledge graph mining to centuries of traditional Chinese medicine literature and clinical records. By cross-referencing historical formulation data with modern molecular databases and disease ontologies, the platform identifies promising TCM-derived compounds and modified formulations for new drug development under the Class 2.3 regulatory pathway, bridging traditional wisdom with contemporary pharmaceutical science.",
  "tcm.screening.tag": "Screening",
  "tcm.screening.title": "TCM Active Platform Development",
  "tcm.screening.desc": "A purpose-built AI screening platform for traditional Chinese medicine that addresses the unique challenges of multi-component formulations, synergistic compound interactions, and complex mechanism-of-action profiles inherent in TCM-based therapeutics.",
  "tcm.cap1": "Active compound identification and isolation",
  "tcm.cap2": "Multi-component synergy analysis",
  "tcm.cap3": "Target-compound interaction prediction",
  "tcm.cap4": "Bioavailability and absorption modeling",
  "tcm.cap5": "Herb-drug interaction assessment",
  "tcm.cap6": "Quality control marker identification",
  "tcm.cap7": "Formulation compatibility screening",
  "tcm.cap8": "Metabolite pathway mapping",
  "tcm.cap9": "Toxicity and safety evaluation",
  "tcm.cap10": "Efficacy validation through network pharmacology",
  "tcm.cap11": "Batch consistency and standardization analysis",

  // Tech CTA
  "techCta.heading": "Interested in our technology?",
  "techCta.desc": "Contact our scientific team to learn how our AI platform can accelerate your drug discovery programs.",
  "techCta.cta": "Contact Our Scientific Team",

  // Pipeline page
  "pipeline.breadcrumb": "Pipeline",
  "pipeline.title": "Our Pipeline",
  "pipeline.subtitle": "Advancing a diverse portfolio of AI-designed programs across small molecules, peptides, and traditional Chinese medicine, from early discovery through IND application.",
  "pipeline.heroTitle": "Our Pipeline",
  "pipeline.heroDesc": "Advancing a diverse portfolio of AI-designed programs across small molecules, peptides, and traditional Chinese medicine, from early discovery through IND application.",
  "pipeline.stagesLabel": "Pipeline Stages",
  "pipeline.progressToInd": "Progress to IND",
  "pipeline.researchProgress": "Research Progress",
  "pipeline.program.dfu12": "Small Molecules - Diabetic Foot Ulcer Wound Healing",
  "pipeline.program.dfu11": "Small Molecules - Diabetic Foot Ulcer Wound Healing",
  "pipeline.program.alzheimers": "Small Molecules - Alzheimer's Disease Program",
  "pipeline.program.appetite": "Peptides - Appetite Suppression / Weight Management",
  "pipeline.program.epilepsy": "Traditional Chinese Medicine - Epilepsy Program",
  "pipeline.class12": "Class 1.2",
  "pipeline.class11": "Class 1.1",

  // Partners
  "partners.heading": "Partnership ecosystem",
  "partners.desc": "Collaborating with the world's leading pharmaceutical and biotech companies.",
  "partners.cta": "Discuss a Partnership",

  // Contact page
  "contact.breadcrumb": "Contact",
  "contact.heroTitle": "Contact Us",
  "contact.heroDesc": "Have questions about our technology, pipeline, or partnership opportunities? We would love to hear from you.",
  "contact.formTitle": "Send us a message",
  "contact.formDesc": "Fill out the form and our team will respond within 24 hours.",
  "contact.msgSent": "Message sent!",
  "contact.msgSentDesc": "Thank you for reaching out. Our team will get back to you shortly.",
  "contact.fullName": "Full Name",
  "contact.email": "Email Address",
  "contact.organization": "Organization",
  "contact.message": "Message",
  "contact.namePlaceholder": "Dr. Jane Smith",
  "contact.emailPlaceholder": "jane@company.com",
  "contact.orgPlaceholder": "Pharma Corp",
  "contact.msgPlaceholder": "Tell us about your interest in our technology or partnership opportunities...",
  "contact.send": "Send Message",
  "contact.infoTitle": "Get in touch",
  "contact.infoDesc": "Reach us through any of the channels below.",
  "contact.office": "Office",
  "contact.address": "Haidian Heying Center, Haidian District, Beijing",
  "contact.emailLabel": "Email",
  "contact.phone": "Phone",

  // Partnership inquiries
  "partnership.title": "Partnership Inquiries",
  "partnership.desc": "For partnership, licensing, and collaboration opportunities, contact our business development team directly.",

  // News page
  "news.breadcrumb": "News",
  "news.heroTitle": "Latest News & Updates",
  "news.heroDesc": "Stay informed about our latest research breakthroughs, company announcements, and industry insights.",
  "news.comingSoon": "News content coming soon...",

  // FAQ
  "faq.heading": "Frequently asked questions",
  "faq.subtitle": "Common questions about working with Angelpro.",
  "faq.q1": "How does Angelpro collaborate with pharmaceutical partners?",
  "faq.a1": "We offer flexible partnership models including co-development agreements, fee-for-service engagements, and technology licensing. Our team works closely with partner R&D teams to integrate our AI platform into their existing drug discovery workflows, ensuring seamless collaboration and maximum impact.",
  "faq.q2": "Can we access Angelpro data for our own research?",
  "faq.a2": "We offer data access through our partnership agreements. Depending on the engagement model, partners can gain access to curated datasets, model predictions, and platform insights. All data sharing is governed by strict confidentiality and data security protocols.",
  "faq.q3": "What therapeutic areas does Angelpro focus on?",
  "faq.a3": "Our current pipeline spans small molecules, peptides, and traditional Chinese medicine. Our AI platform is disease-agnostic and can be applied to virtually any therapeutic area. We are actively exploring expansion into immunology, metabolic diseases, and infectious diseases.",
  "faq.q4": "How can I apply for a position at Angelpro?",
  "faq.a4": "We are always looking for exceptional talent across computational biology, machine learning, medicinal chemistry, and engineering. Please send your CV and a brief cover letter to careers@Angelpro.ai. We also post open positions on our LinkedIn page.",
  "faq.q5": "What makes Angelpro different from other AI drug discovery companies?",
  "faq.a5": "Our vertically integrated platform covers small molecules, peptides, and TCM — three modalities in a single platform. This end-to-end approach, validated by active clinical programs, sets us apart from point solutions in the market.",
}

/* ──────────── Chinese dictionary ──────────── */
const zh: Record<string, string> = {
  // Nav
  "nav.home": "\u9996\u9875",
  "nav.technology": "\u6280\u672f\u5e73\u53f0",
  "nav.pipeline": "\u7814\u53d1\u7ba1\u7ebf",
  "nav.news": "\u65b0\u95fb",
  "nav.contact": "\u8054\u7cfb\u6211\u4eec",

  // Hero
  "hero.badge": "AI\u9a71\u52a8\u7684\u836f\u7269\u53d1\u73b0",
  "hero.title": "AI\u9a71\u52a8\u7684\u5c0f\u5206\u5b50\u3001\u591a\u80bd\u3001\u4e2d\u836f\u7814\u53d1\u5e73\u53f0",
  "hero.subtitle": "\u878d\u5408\u8ba1\u7b97\u751f\u7269\u5b66\u4e0e\u673a\u5668\u5b66\u4e60\uff0c\u52a0\u901f\u4ece\u53d1\u73b0\u5230IND\u7684\u7a81\u7834\u6027\u7597\u6cd5\u7814\u53d1",
  "hero.exploreTech": "\u63a2\u7d22\u6280\u672f",
  "hero.viewPipeline": "\u67e5\u770b\u7ba1\u7ebf",

  // Logo band
  "logoBand.title": "\u53d7\u5230\u9886\u5148\u5236\u836f\u4f01\u4e1a\u548cCRO\u5408\u4f5c\u4f19\u4f34\u4fe1\u8d56",

  // Value props
  "valueProps.heading": "\u8f6c\u53d8\u836f\u7269\u53d1\u73b0\u7684\u6bcf\u4e2a\u9636\u6bb5",
  "valueProps.subtitle": "\u6211\u4eec\u7684\u96c6\u6210\u5e73\u53f0\u52a0\u901f\u4ece\u9776\u70b9\u5230\u4e34\u5e8a\u7684\u8fdb\u7a0b",
  "valueProps.target.title": "\u9776\u70b9\u8bc6\u522b",
  "valueProps.target.desc": "AI\u7b97\u6cd5\u5206\u6790\u590d\u6742\u7684\u751f\u7269\u6570\u636e\uff0c\u4ee5\u524d\u6240\u672a\u6709\u7684\u51c6\u786e\u6027\u548c\u901f\u5ea6\u8bc6\u522b\u65b0\u578b\u836f\u7269\u9776\u70b9\u3002",
  "valueProps.lead.title": "\u5148\u5bfc\u5316\u5408\u7269\u4f18\u5316",
  "valueProps.lead.desc": "\u751f\u6210\u5f0f\u5316\u5b66\u5728\u6570\u5468\u800c\u975e\u6570\u5e74\u5185\u8bbe\u8ba1\u548c\u4f18\u5316\u5019\u9009\u5206\u5b50\uff0c\u5927\u5e45\u7f29\u77ed\u5f00\u53d1\u65f6\u95f4\u3002",
  "valueProps.clinical.title": "\u4e34\u5e8a\u6210\u529f",
  "valueProps.clinical.desc": "\u65e9\u671f\u9884\u6d4b\u4e34\u5e8a\u7ed3\u679c\uff0c\u51cf\u5c11\u540e\u671f\u5931\u8d25\uff0c\u63d0\u9ad8\u60a8\u7ba1\u7ebf\u7684\u6574\u4f53\u6210\u529f\u7387\u3002",

  // Platform preview
  "platform.tag": "\u6211\u4eec\u7684\u5e73\u53f0",
  "platform.heading": "\u7aef\u5230\u7aef\u7684AI\u836f\u7269\u53d1\u73b0\u57fa\u7840\u8bbe\u65bd",
  "platform.desc": "\u6211\u4eec\u7684\u4e13\u6709\u5e73\u53f0\u5c06\u6df1\u5ea6\u5b66\u4e60\u3001\u751f\u6210\u5f0fAI\u548c\u8ba1\u7b97\u5316\u5b66\u96c6\u6210\u5230\u7edf\u4e00\u5de5\u4f5c\u6d41\u4e2d\uff0c\u8fde\u63a5\u4ece\u9776\u70b9\u8bc6\u522b\u5230\u4e34\u5e8a\u5019\u9009\u7b5b\u9009\u7684\u5168\u8fc7\u7a0b\u3002",
  "platform.feat1": "\u591a\u7ec4\u5b66\u6570\u636e\u96c6\u6210\u4e0e\u5206\u6790",
  "platform.feat2": "AI\u9a71\u52a8\u7684\u57fa\u4e8e\u7ed3\u6784\u7684\u836f\u7269\u8bbe\u8ba1",
  "platform.feat3": "\u751f\u6210\u5f0f\u5206\u5b50\u4f18\u5316",
  "platform.feat4": "\u5b9e\u65f6\u9884\u6d4b\u6bd2\u7406\u5b66",
  "platform.feat5": "\u81ea\u52a8\u5316\u5148\u5bfc\u5316\u5408\u7269\u8bc4\u5206\u4e0e\u4f18\u5148\u7ea7\u6392\u5e8f",
  "platform.learnMore": "\u4e86\u89e3\u66f4\u591a",

  // Pipeline preview
  "pipelinePreview.tag": "\u7814\u53d1\u7ba1\u7ebf",
  "pipelinePreview.heading": "\u63a8\u8fdb\u591a\u4e2a\u6cbb\u7597\u9886\u57df\u7684\u9879\u76ee",
  "pipelinePreview.progress": "\u8fdb\u5ea6",
  "pipelinePreview.viewFull": "\u67e5\u770b\u5b8c\u6574\u7ba1\u7ebf",

  // Pipeline program areas
  "area.smallMolecules": "\u5c0f\u5206\u5b50",
  "area.peptides": "\u591a\u80bd",
  "area.tcm": "\u4e2d\u836f",

  // Pipeline program names
  "program.dfu12": "\u7cd6\u5c3f\u75c5\u8db3\u6e83\u75a1 (1.2\u7c7b)",
  "program.appetite": "\u98df\u6b32\u6291\u5236",
  "program.epilepsy": "\u7672\u75eb\u9879\u76ee",

  // Pipeline stages
  "stage.discovery": "\u53d1\u73b0",
  "stage.leadOptimization": "\u5148\u5bfc\u5316\u5408\u7269\u4f18\u5316",
  "stage.preclinical": "\u4e34\u5e8a\u524d",
  "stage.indEnabling": "IND\u4f7f\u80fd",
  "stage.ind": "IND",
  "stage.indApplication": "IND\u7533\u8bf7",
  "stage.clinical1": "\u4e34\u5e8a\u4e001\u671f",
  "stage.clinical2": "\u4e34\u5e8a\u4e002\u671f",
  "stage.clinical3": "\u4e34\u5e8a\u4e003\u671f",

  // News
  "news.tag": "\u6700\u65b0\u52a8\u6001",
  "news.heading": "\u6700\u65b0\u8d44\u8baf",
  "news.1.date": "2026\u5e741\u670815\u65e5",
  "news.1.title": "Angelpro\u7cd6\u5c3f\u75c5\u8db3\u6e83\u75a1\u9879\u76ee\u63a8\u8fdb\u81f3IND\u7533\u8bf7\u9636\u6bb5",
  "news.1.summary": "\u6211\u4eec\u7684\u5c0f\u5206\u5b50\u9886\u5148\u9879\u76ee\uff081.2\u7c7b\u521b\u65b0\u836f\uff09\u8fdb\u5165IND\u4f7f\u80fd\u9636\u6bb5\uff0c\u6807\u5fd7\u7740AI\u9a71\u52a8\u836f\u7269\u518d\u5229\u7528\u7684\u91cd\u8981\u91cc\u7a0b\u7891\u3002",
  "news.2.date": "2025\u5e7412\u67088\u65e5",
  "news.2.title": "AI\u8bbe\u8ba1\u7684\u591a\u80bd\u5019\u9009\u836f\u7269\u5728\u98df\u6b32\u6291\u5236\u65b9\u9762\u663e\u793a\u826f\u597d\u7ed3\u679c",
  "news.2.summary": "\u6211\u4eec\u7684\u591a\u80bd\u8bbe\u8ba1\u5e73\u53f0\u751f\u6210\u4e86\u5177\u6709\u66f4\u9ad8\u9009\u62e9\u6027\u548c\u7a33\u5b9a\u6027\u7684\u65b0\u578b\u5019\u9009\u836f\u7269\uff0c\u7528\u4e8e\u4f53\u91cd\u7ba1\u7406\u5e94\u7528\u3002",
  "news.3.date": "2025\u5e7411\u670820\u65e5",
  "news.3.title": "Angelpro\u53d1\u5e03\u4e2d\u836f\u6d3b\u6027\u5316\u5408\u7269\u7b5b\u9009\u5e73\u53f0",
  "news.3.summary": "\u65b0\u7684AI\u9a71\u52a8\u5e73\u53f0\u7528\u4e8e\u8bc6\u522b\u548c\u9a8c\u8bc1\u4e2d\u836f\u5236\u5242\u4e2d\u7684\u6d3b\u6027\u5316\u5408\u7269\u3002",
  "news.4.date": "2025\u5e7410\u67085\u65e5",
  "news.4.title": "\u963f\u5c14\u8328\u6d77\u9ed8\u75c5\u9879\u76ee\u8fdb\u5165\u5148\u5bfc\u5316\u5408\u7269\u4f18\u5316\u9636\u6bb5",
  "news.4.summary": "\u6211\u4eec\u7684\u5c0f\u5206\u5b50\u9879\u76ee\u5229\u7528\u7ed3\u6784\u4f18\u5316\u7528\u4e8e1.1\u7c7b\u521b\u65b0\u836f\u7684\u5f00\u53d1\uff0c\u8fdb\u5165\u5148\u5bfc\u5316\u5408\u7269\u4f18\u5316\u9636\u6bb5\u3002",

  // Careers
  "careers.heading": "\u52a0\u5165\u6211\u4eec\uff0c\u5171\u540c\u53d8\u9769\u836f\u7269\u53d1\u73b0",
  "careers.desc": "\u6211\u4eec\u6b63\u5728\u7ec4\u5efa\u4e00\u652f\u4e16\u754c\u7ea7\u7684\u79d1\u5b66\u5bb6\u548c\u8fdc\u89c1\u8005\u56e2\u961f\u3002\u4e00\u8d77\u641e\u79d1\u7814\uff0c\u5e2e\u52a9\u6211\u4eec\u6784\u5efa\u533b\u5b66\u7684\u672a\u6765\u3002",
  "careers.cta": "\u8054\u7cfb\u6211\u4eec",

  // Image Carousel
  "carousel.home.title": "\u63a2\u7d22\u6211\u4eec\u7684\u524d\u6cbf\u7814\u7a76",
  "carousel.home.desc": "\u4ece\u7ec6\u80de\u751f\u7269\u5b66\u5230\u8ba1\u7b97\u5316\u5b66\uff0c\u5168\u65b9\u4f4d\u5c55\u793a\u6211\u4eec\u7684\u7814\u7a76\u9886\u57df",
  "carousel.tech.title": "\u6211\u4eec\u7684\u6280\u672f\u80fd\u529b",
  "carousel.tech.desc": "\u4ece\u57fa\u56e0\u7f16\u8f91\u5230\u86cb\u767d\u8d28\u6298\u53e0\uff0c\u5c55\u793a\u6211\u4eec\u7684\u6838\u5fc3\u6280\u672f\u5e73\u53f0",
  "carousel.pipeline.title": "\u7814\u53d1\u7ba1\u7ebf\u80cc\u540e\u7684\u79d1\u5b66",
  "carousel.pipeline.desc": "\u6df1\u5165\u4e86\u89e3\u6211\u4eec\u836f\u7269\u7814\u53d1\u8fc7\u7a0b\u4e2d\u7684\u79d1\u5b66\u6280\u672f",
  "carousel.pipeline.overlayText": "\u6e7f\u5b9e\u9a8c\u548c\u5e72\u5b9e\u9a8c\u4ee5\u53caAI\u9884\u6d4b\u7ed3\u679c\u76f8\u7b26\u5408",
  "carousel.pipeline.image1": "HE\u67d3\u8272\u8bc4\u5206\uff1a\u53cd\u6620\u4e86\u7ec4\u7ec7\u4fee\u590d\u3001\u708e\u75c7\u53cd\u5e94\u548c\u7ed3\u6784\u5b8c\u6574\u6027\u7684\u6574\u4f53\u60c5\u51b5\uff0c\u989c\u8272\u8f83\u7ea2\u8bf4\u660e\u8089\u82bd\u7ec4\u7ec7\u5f62\u6210\u826f\u597d\u3002",
  "carousel.pipeline.image2": "Masson\u67d3\u8272\uff08\u80f6\u539f\u6c89\u79ef\uff09\u7ed3\u679c\u53cd\u5e94\u80f6\u539f\u6c89\u6dc0\u91cf\u663e\u8457\u964d\u4f4e\uff0c\u8868\u660e\u836f\u7269\u4f5c\u7528\u4e8e\u76ae\u80a4\u4fee\u590d\u8fc7\u7a0b\u4e2d\uff0c\u7ea4\u7ec7\u5316\u7a0b\u5ea6\u8f83\u8f7b\uff0c\u4e0d\u5bb9\u6613\u5f62\u6210\u765f\u75d5\u3002",
  "carousel.pipeline.image3": "F4/80+CD206+\u53cc\u9633\u6027\u7ec6\u80de\u5360\u6bd4\u7ed3\u679c\u63d0\u793a\uff1aM2\u578b\u5de8\u5438\u7ec6\u80de\u5728\u514d\u75ab\u53cd\u5e94\u540e\u671f\u6709\u4fee\u590d\u4f5c\u7528\uff0c\u836f\u7269\u6709\u660e\u663e\u4fc3\u8fdbM2\u6781\u5316\u7684\u4f5c\u7528\u3002\u8868\u660e\u836f\u7269\u7684\u4f5c\u7528\u4e8e\u5c0f\u9f20\u7684\u514d\u75ab\u73af\u5883\u53ef\u80fd\u66f4\u503e\u5411\u4e8e\u4fee\u590d\u548c\u6297\u708e\u4f5c\u7528\u3002",
  "carousel.pipeline.image4": "F4/80+CD45+\u53cc\u9633\u6027\u7ec6\u80de\u5360\u6bd4\u7ed3\u679c\u63d0\u793a\uff1aM1\u578b\u5de8\u5438\u7ec6\u80de\u53ef\u80fd\u4e0e\u708e\u75c7\u53cd\u5e94\u6216\u514d\u75ab\u6d3b\u6027\u6709\u5173\uff0c\u836f\u7269\u6709\u6291\u5236M1\u6781\u5316\u7684\u8d8b\u52bf\u3002",
  "carousel.pipeline.image5": "\u6d41\u5f0f\u5b9e\u9a8c\u7ed3\u679c\u663e\u793a\uff0c\u836f\u7269\u80fd\u591f\u660e\u663e\u63d0\u5347\u5de8\u5438\u7ec6\u80deM2\u6781\u5316\uff0c\u6291\u5236M1\u6781\u5316\u3002",
  "carousel.pipeline.image6": "\u514d\u75ab\u8367\u5149\u7ed3\u679c\u663e\u793a\uff0c\u836f\u7269\u80fd\u591f\u660e\u663e\u63d0\u5347\u5de8\u5438\u7ec6\u80deM2\u6781\u5316\uff0c\u6291\u5236M1\u6781\u5316\u3002",
  "carousel.pipeline.image7": "Western blot\u5b9e\u9a8c\u7ed3\u679c\u663e\u793a\uff0c\u80fd\u591f\u660e\u663e\u6291\u5236\u5de8\u5438\u7ec6\u80deNF-\u03baB\u3001PI3K/AKT\u53caNLRP3\u708e\u75c7\u5c0f\u4f53\u901a\u8def\u4fe1\u53f7\u901a\u8def\u7684\u8868\u8fbe\u3002",
  "carousel.contact.title": "\u6211\u4eec\u7684\u7814\u7a76\u6210\u679c",
  "carousel.contact.desc": "\u4e86\u89e3\u6211\u4eec\u7684\u7814\u7a76\u8fdb\u5c55\u548c\u6280\u672f\u7a81\u7834",

  // Footer
  "footer.desc": "AI\u9a71\u52a8\u7684\u5c0f\u5206\u5b50\u3001\u591a\u80bd\u548c\u4e2d\u836f\u836f\u7269\u53d1\u73b0\u3002\u7528\u4eba\u5de5\u667a\u80fd\u52a0\u901f\u7a81\u7834\u6027\u7597\u6cd5\u3002",
  "footer.company": "\u516c\u53f8",
  "footer.resources": "\u8d44\u6e90",
  "footer.partnerships": "\u5408\u4f5c\u4f19\u4f34",
  "footer.careers": "\u62db\u8d24\u7eb3\u58eb",
  "footer.publications": "\u5b66\u672f\u53d1\u8868",
  "footer.copyright": "Angelpro. \u7248\u6743\u6240\u6709\u3002",
  "footer.privacy": "\u9690\u79c1\u653f\u7b56",
  "footer.terms": "\u670d\u52a1\u6761\u6b3e",

  // Technology page
  "tech.breadcrumb": "\u6280\u672f\u5e73\u53f0",
  "tech.heroTitle": "\u6211\u4eec\u7684\u6280\u672f",
  "tech.heroDesc": "Angelpro\u5f00\u53d1\u4e13\u6709\u7684AI\u9a71\u52a8\u836f\u7269\u53d1\u73b0\u5e73\u53f0\uff0c\u6db5\u76d6\u5c0f\u5206\u5b50\u3001\u591a\u80bd\u548c\u4e2d\u836f\uff0c\u6bcf\u4e2a\u5e73\u53f0\u5747\u7531\u4e13\u95e8\u6784\u5efa\u7684\u8ba1\u7b97\u6a21\u578b\u548c\u6df1\u5ea6\u5b66\u4e60\u67b6\u6784\u9a71\u52a8\u3002",

  // Small molecules platform
  "sm.platformTag": "\u5e73\u53f0 I",
  "sm.title": "\u5c0f\u5206\u5b50",
  "sm.desc": "\u7aef\u5230\u7aef\u7684\u5c0f\u5206\u5b50\u836f\u7269\u53d1\u73b0AI\u80fd\u529b\uff0c\u4ece\u836f\u7269\u518d\u5229\u7528\u5230\u8bbe\u8ba1\u5177\u6709\u4f18\u5316\u836f\u7406\u5b66\u7279\u6027\u7684\u65b0\u578b\u5316\u5b66\u5b9e\u4f53\u3002",
  "sm.repurposing.tag": "\u53d1\u73b0",
  "sm.repurposing.title": "AI\u9a71\u52a8\u7684\u836f\u7269\u518d\u5229\u7528\u20141.2\u7c7b\u521b\u65b0\u836f",
  "sm.repurposing.desc": "\u6211\u4eec\u7684AI\u5e73\u53f0\u901a\u8fc7\u5206\u6790\u5927\u89c4\u6a21\u5206\u5b50\u4e92\u4f5c\u7f51\u7edc\u3001\u4e34\u5e8a\u6570\u636e\u548c\u591a\u7ec4\u5b66\u7279\u5f81\uff0c\u4e3a\u73b0\u6709\u5df2\u6279\u51c6\u836f\u7269\u8bc6\u522b\u65b0\u7684\u6cbb\u7597\u9002\u5e94\u75c7\u3002\u901a\u8fc7\u5229\u7528\u57fa\u4e8e\u836f\u7269-\u9776\u70b9\u7ed3\u5408\u8c31\u548c\u75be\u75c5\u75c5\u7406\u6570\u636e\u96c6\u8bad\u7ec3\u7684\u6df1\u5ea6\u5b66\u4e60\u6a21\u578b\uff0c\u6211\u4eec\u53d1\u73b0\u9690\u85cf\u7684\u836f\u7406\u5b66\u5173\u7cfb\uff0c\u5b9e\u73b0\u5df2\u77e5\u5316\u5408\u7269\u7684\u5feb\u901f\u91cd\u65b0\u5b9a\u4f4d\uff0c\u663e\u8457\u7f29\u77ed\u5f00\u53d1\u65f6\u95f4\u5e76\u964d\u4f4eIND\u8def\u5f84\u98ce\u9669\u3002",
  "sm.optimization.tag": "\u4f18\u5316",
  "sm.optimization.title": "\u7ed3\u6784\u4f18\u5316\u20141.1\u7c7b\u521b\u65b0\u836f",
  "sm.optimization.desc": "\u6211\u4eec\u7684\u751f\u6210\u5f0f\u5316\u5b66\u5f15\u64ce\u901a\u8fc7AI\u5f15\u5bfc\u7684\u8fed\u4ee3\u4fee\u6539\u5faa\u73af\u8bbe\u8ba1\u548c\u4f18\u5316\u65b0\u578b\u5206\u5b50\u7ed3\u6784\u3002\u4ece\u9a8c\u8bc1\u7684\u82d7\u5934\u5316\u5408\u7269\u51fa\u53d1\uff0c\u5e73\u53f0\u5e94\u7528\u6784\u6548\u5173\u7cfb\uff08SAR\uff09\u5efa\u6a21\u3001\u5206\u5b50\u6027\u8d28\u9884\u6d4b\u548c\u5408\u6210\u53ef\u53ca\u6027\u8bc4\u5206\uff0c\u7cfb\u7edf\u5730\u63d0\u9ad8\u6548\u529b\u3001\u9009\u62e9\u6027\u3001\u4ee3\u8c22\u7a33\u5b9a\u6027\u548c\u5b89\u5168\u6027\uff0c\u751f\u6210\u5177\u6709\u4f18\u5316\u836f\u7406\u5b66\u7279\u5f81\u7684\u771f\u6b63\u65b0\u578b\u836f\u7269\u5019\u9009\u3002",
  "sm.screening.tag": "\u7b5b\u9009",
  "sm.screening.title": "\u836f\u7406\u5b66\u7ea6\u675f\u7b5b\u9009",
  "sm.screening.desc": "\u4e00\u4e2a\u5168\u9762\u7684\u8ba1\u7b97\u673a\u7b5b\u9009\u5e73\u53f0\uff0c\u540c\u65f6\u8bc4\u4f30\u836f\u7269\u5019\u9009\u7684\u591a\u4e2a\u836f\u7406\u5b66\u7ef4\u5ea6\uff0c\u786e\u4fdd\u53ea\u6709\u6700\u6709\u524d\u666f\u7684\u5316\u5408\u7269\u80fd\u8fdb\u5165\u7ba1\u7ebf\u3002",
  "sm.cap1": "\u5206\u5b50\u7406\u5316\u6027\u8d28\u9884\u6d4b",
  "sm.cap2": "\u4ee3\u8c22\u7a33\u5b9a\u6027\u5206\u6790",
  "sm.cap3": "ADMET\u5c5e\u6027\u9884\u6d4b",
  "sm.cap4": "\u53ef\u5408\u6210\u6027\u9884\u6d4b",
  "sm.cap5": "\u9776\u70b9\u6d3b\u6027\u9884\u6d4b",
  "sm.cap6": "\u5206\u5b50\u5bf9\u63a5\u6a21\u62df",
  "sm.cap7": "\u8868\u578b\u7b5b\u9009\u9884\u6d4b",
  "sm.cap8": "\u591a\u9776\u70b9\u76f8\u4e92\u4f5c\u7528\u8bc4\u4f30",
  "sm.cap9": "\u5206\u5b50\u52a8\u529b\u5b66\u6a21\u62df",
  "sm.cap10": "\u901a\u8def\u5206\u6790\u4e0e\u7f51\u7edc\u836f\u7406\u5b66",
  "sm.cap11": "QSAR\u5efa\u6a21\u4e0e\u9884\u6d4b",
  
  // New small molecule modules
  "sm.kgRepurposing.tag": "\u77e5\u8bc6\u56fe\u8c31",
  "sm.kgRepurposing.title": "\u57fa\u4e8e\u77e5\u8bc6\u56fe\u8c31\u548c\u751f\u7269\u8fc7\u7a0b\u7684\u8001\u836f\u65b0\u7528\u7cfb\u7edf",
  "sm.kgRepurposing.desc": "\u7ed3\u5408\u77e5\u8bc6\u56fe\u8c31\u6280\u672f\u4e0e\u751f\u7269\u8fc7\u7a0b\u5206\u6790\uff0c\u667a\u80fd\u53d1\u73b0\u73b0\u6709\u836f\u7269\u7684\u65b0\u7528\u9014\uff0c\u5927\u5e45\u63d0\u9ad8\u836f\u7269\u518d\u5229\u7528\u6548\u7387\u3002",
  
  "sm.kgPrediction.tag": "\u529f\u80fd\u9884\u6d4b",
  "sm.kgPrediction.title": "\u57fa\u4e8e\u77e5\u8bc6\u56fe\u8c31\u7684\u5c0f\u5206\u5b50\u836f\u7269\u529f\u80fd\u9884\u6d4b\u7cfb\u7edf",
  "sm.kgPrediction.desc": "\u5229\u7528\u77e5\u8bc6\u56fe\u8c31\u7684\u591a\u7ef4\u7ed3\u6784\uff0c\u7cbe\u786e\u9884\u6d4b\u5c0f\u5206\u5b50\u836f\u7269\u7684\u751f\u7269\u529f\u80fd\u3001\u75c5\u7406\u673a\u5236\u548c\u836f\u7406\u5b66\u7279\u6027\u3002",
  
  "sm.multimodalMining.tag": "\u591a\u6a21\u6001",
  "sm.multimodalMining.title": "\u65b0\u4e00\u4ee3\u591a\u6a21\u6001\u5c0f\u5206\u5b50\u529f\u80fd\u6316\u6398\u7cfb\u7edf",
  "sm.multimodalMining.desc": "\u96c6\u6210\u7ed3\u6784\u3001\u5e8f\u5217\u3001\u5316\u5b66\u7279\u6027\u7b49\u591a\u6a21\u6001\u6570\u636e\uff0c\u6df1\u5ea6\u6316\u6398\u5c0f\u5206\u5b50\u7684\u6f5c\u5728\u529f\u80fd\u548c\u6cbb\u7597\u4ef7\u503c\u3002",
  
  "sm.3dOptimization.tag": "3D\u4f18\u5316",
  "sm.3dOptimization.title": "\u57fa\u4e8e\u76ee\u6807\u9776\u70b9\u548c\u53c2\u8003\u5206\u5b50\u76843D\u5206\u5b50\u4f18\u5316\u7b97\u6cd5",
  "sm.3dOptimization.desc": "\u57fa\u4e8e\u9776\u70b9\u7ed3\u6784\u4e0e\u53c2\u8003\u5206\u5b50\uff0c\u901a\u8fc7AI\u7b97\u6cd5\u4f18\u5316\u5206\u5b50\u76843D\u7ed3\u6784\uff0c\u63d0\u9ad8\u836f\u7269\u7684\u9009\u62e9\u6027\u548c\u6548\u679c\u3002",

  // Peptides platform
  "pep.platformTag": "\u5e73\u53f0 II",
  "pep.title": "\u591a\u80bd",
  "pep.desc": "AI\u9a71\u52a8\u7684\u591a\u80bd\u53d1\u73b0\u548c\u4f18\u5316\u5e73\u53f0\uff0c\u5229\u7528\u6df1\u5ea6\u5b66\u4e60\u8fdb\u884c\u5e8f\u5217\u8bbe\u8ba1\u3001\u7a33\u5b9a\u6027\u5de5\u7a0b\u548c\u591a\u80bd\u6cbb\u7597\u836f\u7269\u7684\u836f\u7406\u5b66\u7b5b\u9009\u3002",
  "pep.design.tag": "\u8bbe\u8ba1\u4e0e\u4f18\u5316",
  "pep.design.title": "\u591a\u80bd\u8bbe\u8ba1\u4e0e\u4f18\u5316",
  "pep.design.desc": "\u6211\u4eec\u7684AI\u591a\u80bd\u5de5\u7a0b\u5e73\u53f0\u7ed3\u5408\u57fa\u4e8e\u5e8f\u5217\u7684\u6df1\u5ea6\u5b66\u4e60\u548c\u7ed3\u6784\u5efa\u6a21\u6765\u8bbe\u8ba1\u65b0\u578b\u591a\u80bd\u6cbb\u7597\u836f\u7269\u3002\u8be5\u7cfb\u7edf\u751f\u6210\u5177\u6709\u589e\u5f3a\u9776\u70b9\u7ed3\u5408\u4eb2\u548c\u529b\u3001\u6539\u5584\u4ee3\u8c22\u7a33\u5b9a\u6027\u548c\u826f\u597d\u836f\u4ee3\u52a8\u529b\u5b66\u7279\u5f81\u7684\u4f18\u5316\u591a\u80bd\u5e8f\u5217\u3002\u901a\u8fc7\u591a\u8f6e\u8ba1\u7b97\u8bbe\u8ba1\u548c\u8bc4\u5206\uff0c\u6211\u4eec\u5feb\u901f\u63a2\u7d22\u5e9e\u5927\u7684\u591a\u80bd\u5e8f\u5217\u7a7a\u95f4\uff0c\u8bc6\u522b\u5177\u6709\u6700\u4f73\u6548\u529b\u3001\u9009\u62e9\u6027\u548c\u836f\u7269\u6837\u6027\u8d28\u5e73\u8861\u7684\u5019\u9009\u836f\u7269\u3002",
  "pep.screening.tag": "\u7b5b\u9009",
  "pep.screening.title": "\u591a\u80bd\u7b5b\u9009\u80fd\u529b",
  "pep.screening.desc": "\u4e13\u4e3a\u591a\u80bd\u6cbb\u7597\u836f\u7269\u91cf\u8eab\u5b9a\u5236\u7684\u5168\u9762\u8ba1\u7b97\u7b5b\u9009\u7ba1\u7ebf\uff0c\u8bc4\u4f30\u5019\u9009\u836f\u7269\u7684\u6240\u6709\u5173\u952e\u836f\u7406\u5b66\u53c2\u6570\uff0c\u786e\u4fdd\u53ea\u6709\u6700\u53ef\u884c\u7684\u591a\u80bd\u8fdb\u5165\u4e34\u5e8a\u524d\u5f00\u53d1\u3002",
  "pep.cap1": "\u591a\u80bd-\u9776\u70b9\u7ed3\u5408\u4eb2\u548c\u529b\u9884\u6d4b",
  "pep.cap2": "\u7a33\u5b9a\u6027\u548c\u534a\u8870\u671f\u4f18\u5316",
  "pep.cap3": "\u819c\u901a\u900f\u6027\u8bc4\u4f30",
  "pep.cap4": "\u514d\u75ab\u539f\u6027\u98ce\u9669\u8bc4\u4f30",
  "pep.cap5": "\u86cb\u767d\u9176\u6297\u6027\u5efa\u6a21",
  "pep.cap6": "\u73af\u5316\u7b56\u7565\u4f18\u5316",
  "pep.cap7": "\u7ec6\u80de\u7a7f\u900f\u9884\u6d4b",
  "pep.cap8": "\u591a\u9776\u70b9\u9009\u62e9\u6027\u7b5b\u9009",
  "pep.cap9": "\u6784\u8c61\u5206\u6790\u4e0e\u52a8\u529b\u5b66",
  "pep.cap10": "\u6784\u6548\u5173\u7cfb\u6620\u5c04",
  "pep.cap11": "\u6bd2\u6027\u548c\u5b89\u5168\u6027\u8bc4\u4f30",
  
  // New peptide modules
  "pep.targetBased.tag": "\u76ee\u6807\u751f\u6210",
  "pep.targetBased.title": "\u57fa\u4e8e\u76ee\u6807\u7684\u591a\u80bd\u836f\u7269\u751f\u6210",
  "pep.targetBased.desc": "\u57fa\u4e8e\u76ee\u6807\u7ed3\u6784\uff0c\u901a\u8fc7AI\u7b97\u6cd5\u751f\u6210\u9ad8\u4eb2\u548c\u529b\u7684\u591a\u80bd\u836f\u7269\u5206\u5b50\uff0c\u63d0\u9ad8\u836f\u7269\u7684\u9009\u62e9\u6027\u548c\u6548\u679c\u3002",
  
  "pep.iptmOptimization.tag": "IPTM\u4f18\u5316",
  "pep.iptmOptimization.title": "\u57fa\u4e8e\u8868\u9762IPTM\u7684\u591a\u80bd\u836f\u7269\u4f18\u5316",
  "pep.iptmOptimization.desc": "\u5229\u7528\u8868\u9762IPTM\uff08\u754c\u9762\u86cb\u767d-\u914d\u4f53\u76f8\u4e92\u4f5c\u7528\uff09\u5206\u6790\uff0c\u4f18\u5316\u591a\u80bd\u4e0e\u76ee\u6807\u7684\u7ed3\u5408\u754c\u9762\uff0c\u589e\u5f3a\u836f\u7269\u7684\u7a33\u5b9a\u6027\u548c\u4eb2\u548c\u529b\u3002",
  
  "pep.evolutionaryOptimization.tag": "\u8fdb\u5316\u7b97\u6cd5",
  "pep.evolutionaryOptimization.title": "\u57fa\u4e8e\u8fdb\u5316\u7b97\u6cd5\u7684\u591a\u80bd\u4f18\u5316\u7b97\u6cd5",
  "pep.evolutionaryOptimization.desc": "\u901a\u8fc7\u6a21\u62df\u751f\u7269\u8fdb\u5316\u8fc7\u7a0b\uff0c\u8fed\u4ee3\u4f18\u5316\u591a\u80bd\u5e8f\u5217\u548c\u7ed3\u6784\uff0c\u751f\u6210\u5177\u6709\u66f4\u4f18\u836f\u7406\u5b66\u7279\u6027\u7684\u591a\u80bd\u836f\u7269\u3002",
  // TCM platform
  "tcm.platformTag": "\u5e73\u53f0 III",
  "tcm.title": "\u4e2d\u836f",
  "tcm.desc": "AI\u9a71\u52a8\u7684\u4e2d\u836f\u73b0\u4ee3\u5316\u836f\u7269\u53d1\u73b0\u5e73\u53f0\uff0c\u5c06\u53e4\u4ee3\u836f\u7406\u5b66\u77e5\u8bc6\u4e0e\u5c16\u7aef\u8ba1\u7b97\u65b9\u6cd5\u76f8\u7ed3\u5408\uff0c\u7528\u4e8e\u6d3b\u6027\u5316\u5408\u7269\u8bc6\u522b\u548c\u65b0\u836f\u5f00\u53d1\u3002",
  "tcm.discovery.tag": "\u53d1\u73b0",
  "tcm.discovery.title": "2.3\u7c7b\u6539\u826f\u578b\u65b0\u836f\u53d1\u73b0",
  "tcm.discovery.desc": "\u6211\u4eec\u7684\u4e2d\u836f\u53d1\u73b0\u5e73\u53f0\u5e94\u7528AI\u9a71\u52a8\u7684\u81ea\u7136\u8bed\u8a00\u5904\u7406\u548c\u77e5\u8bc6\u56fe\u8c31\u6316\u6398\uff0c\u6df1\u5165\u7814\u7a76\u6570\u767e\u5e74\u7684\u4e2d\u533b\u836f\u6587\u732e\u548c\u4e34\u5e8a\u8bb0\u5f55\u3002\u901a\u8fc7\u5c06\u5386\u53f2\u5904\u65b9\u6570\u636e\u4e0e\u73b0\u4ee3\u5206\u5b50\u6570\u636e\u5e93\u548c\u75be\u75c5\u672c\u4f53\u8fdb\u884c\u4ea4\u53c9\u53c2\u8003\uff0c\u5e73\u53f0\u8bc6\u522b\u6709\u524d\u666f\u7684\u4e2d\u836f\u884d\u751f\u5316\u5408\u7269\u548c\u6539\u826f\u5236\u5242\uff0c\u7528\u4e8e2.3\u7c7b\u76d1\u7ba1\u9014\u5f84\u4e0b\u7684\u65b0\u836f\u5f00\u53d1\uff0c\u67b6\u8d77\u4f20\u7edf\u667a\u6167\u4e0e\u5f53\u4ee3\u5236\u836f\u79d1\u5b66\u7684\u6865\u6881\u3002",
  "tcm.screening.tag": "\u7b5b\u9009",
  "tcm.screening.title": "\u4e2d\u836f\u6d3b\u6027\u5e73\u53f0\u5f00\u53d1",
  "tcm.screening.desc": "\u4e13\u4e3a\u4e2d\u836f\u6784\u5efa\u7684AI\u7b5b\u9009\u5e73\u53f0\uff0c\u89e3\u51b3\u591a\u7ec4\u5206\u5236\u5242\u3001\u534f\u540c\u5316\u5408\u7269\u76f8\u4e92\u4f5c\u7528\u548c\u4e2d\u836f\u7279\u6709\u7684\u590d\u6742\u4f5c\u7528\u673a\u5236\u7b49\u72ec\u7279\u6311\u6218\u3002",
  "tcm.cap1": "\u6d3b\u6027\u5316\u5408\u7269\u8bc6\u522b\u4e0e\u5206\u79bb",
  "tcm.cap2": "\u591a\u7ec4\u5206\u534f\u540c\u5206\u6790",
  "tcm.cap3": "\u9776\u70b9-\u5316\u5408\u7269\u76f8\u4e92\u4f5c\u7528\u9884\u6d4b",
  "tcm.cap4": "\u751f\u7269\u5229\u7528\u5ea6\u4e0e\u5438\u6536\u5efa\u6a21",
  "tcm.cap5": "\u836f\u7269\u76f8\u4e92\u4f5c\u7528\u8bc4\u4f30",
  "tcm.cap6": "\u8d28\u63a7\u6807\u5fd7\u7269\u8bc6\u522b",
  "tcm.cap7": "\u5236\u5242\u517c\u5bb9\u6027\u7b5b\u9009",
  "tcm.cap8": "\u4ee3\u8c22\u7269\u901a\u8def\u6620\u5c04",
  "tcm.cap9": "\u6bd2\u6027\u548c\u5b89\u5168\u6027\u8bc4\u4f30",
  "tcm.cap10": "\u7f51\u7edc\u836f\u7406\u5b66\u7597\u6548\u9a8c\u8bc1",
  "tcm.cap11": "\u6279\u6b21\u4e00\u81f4\u6027\u4e0e\u6807\u51c6\u5316\u5206\u6790",

  // Tech CTA
  "techCta.heading": "\u5bf9\u6211\u4eec\u7684\u6280\u672f\u611f\u5174\u8da3\uff1f",
  "techCta.desc": "\u8054\u7cfb\u6211\u4eec\u7684\u79d1\u5b66\u56e2\u961f\uff0c\u4e86\u89e3\u6211\u4eec\u7684AI\u5e73\u53f0\u5982\u4f55\u52a0\u901f\u60a8\u7684\u836f\u7269\u53d1\u73b0\u9879\u76ee\u3002",
  "techCta.cta": "\u8054\u7cfb\u6211\u4eec\u7684\u79d1\u5b66\u56e2\u961f",

  // Pipeline page
  "pipeline.breadcrumb": "\u7814\u53d1\u7ba1\u7ebf",
  "pipeline.title": "\u6211\u4eec\u7684\u7ba1\u7ebf",
  "pipeline.subtitle": "\u63a8\u8fdb\u5c0f\u5206\u5b50\u3001\u591a\u80bd\u548c\u4e2d\u836f\u7684\u591a\u5143\u5316AI\u8bbe\u8ba1\u9879\u76ee\u7ec4\u5408\uff0c\u4ece\u65e9\u671f\u53d1\u73b0\u5230IND\u7533\u8bf7\u3002",
  "pipeline.heroTitle": "\u6211\u4eec\u7684\u7ba1\u7ebf",
  "pipeline.heroDesc": "\u63a8\u8fdb\u5c0f\u5206\u5b50\u3001\u591a\u80bd\u548c\u4e2d\u836f\u7684\u591a\u5143\u5316AI\u8bbe\u8ba1\u9879\u76ee\u7ec4\u5408\uff0c\u4ece\u65e9\u671f\u53d1\u73b0\u5230IND\u7533\u8bf7\u3002",
  "pipeline.stagesLabel": "\u7ba1\u7ebf\u9636\u6bb5",
  "pipeline.progressToInd": "\u5230IND\u7684\u8fdb\u5ea6",
  "pipeline.researchProgress": "\u7814\u53d1\u8fdb\u5ea6",
  "pipeline.program.dfu12": "小分子 - 糖尿病足溃疡伤口愈合",
  "pipeline.program.dfu11": "小分子 - 糖尿病足溃疡伤口愈合",
  "pipeline.program.alzheimers": "小分子 - 阿尔茨海默病项目",
  "pipeline.program.appetite": "多肽 - 食欲抑制 / 体重管理",
  "pipeline.program.epilepsy": "中药 - 癲痫项目",
  "pipeline.class12": "1.2\u7c7b",
  "pipeline.class11": "1.1\u7c7b",

  // Partners
  "partners.heading": "\u5408\u4f5c\u4f19\u4f34\u751f\u6001",
  "partners.desc": "\u4e0e\u5168\u7403\u9886\u5148\u7684\u5236\u836f\u548c\u751f\u7269\u6280\u672f\u516c\u53f8\u5408\u4f5c\u3002",
  "partners.cta": "\u8ba8\u8bba\u5408\u4f5c",

  // Contact page
  "contact.breadcrumb": "\u8054\u7cfb\u6211\u4eec",
  "contact.heroTitle": "\u8054\u7cfb\u6211\u4eec",
  "contact.heroDesc": "\u5bf9\u6211\u4eec\u7684\u6280\u672f\u3001\u7ba1\u7ebf\u6216\u5408\u4f5c\u673a\u4f1a\u6709\u7591\u95ee\uff1f\u6211\u4eec\u5f88\u4e50\u610f\u542c\u53d6\u60a8\u7684\u610f\u89c1\u3002",
  "contact.formTitle": "\u53d1\u9001\u6d88\u606f",
  "contact.formDesc": "\u586b\u5199\u8868\u5355\uff0c\u6211\u4eec\u7684\u56e2\u961f\u5c06\u572824\u5c0f\u65f6\u5185\u56de\u590d\u3002",
  "contact.msgSent": "\u6d88\u606f\u5df2\u53d1\u9001\uff01",
  "contact.msgSentDesc": "\u611f\u8c22\u60a8\u7684\u8054\u7cfb\u3002\u6211\u4eec\u7684\u56e2\u961f\u5c06\u5c3d\u5feb\u56de\u590d\u60a8\u3002",
  "contact.fullName": "\u59d3\u540d",
  "contact.email": "\u7535\u5b50\u90ae\u4ef6",
  "contact.organization": "\u7ec4\u7ec7\u673a\u6784",
  "contact.message": "\u6d88\u606f\u5185\u5bb9",
  "contact.namePlaceholder": "\u5f20\u4e09",
  "contact.emailPlaceholder": "zhangsan@company.com",
  "contact.orgPlaceholder": "\u5236\u836f\u516c\u53f8",
  "contact.msgPlaceholder": "\u8bf7\u544a\u8bc9\u6211\u4eec\u60a8\u5bf9\u6211\u4eec\u6280\u672f\u6216\u5408\u4f5c\u673a\u4f1a\u7684\u5174\u8da3...",
  "contact.send": "\u53d1\u9001\u6d88\u606f",
  "contact.infoTitle": "\u8054\u7cfb\u65b9\u5f0f",
  "contact.infoDesc": "\u901a\u8fc7\u4ee5\u4e0b\u4efb\u4f55\u6e20\u9053\u8054\u7cfb\u6211\u4eec\u3002",
  "contact.office": "\u529e\u516c\u5ba4",
  "contact.address": "\u6d77\u6dc0\u548c\u76c8\u4e2d\u5fc3\uff0c\u5317\u4eac\u5e02\u6d77\u6dc0\u533a",
  "contact.emailLabel": "\u7535\u5b50\u90ae\u4ef6",
  "contact.phone": "\u7535\u8bdd",

  // Partnership inquiries
  "partnership.title": "\u5408\u4f5c\u54a8\u8be2",
  "partnership.desc": "\u5982\u9700\u5408\u4f5c\u3001\u8bb8\u53ef\u548c\u534f\u4f5c\u673a\u4f1a\uff0c\u8bf7\u76f4\u63a5\u8054\u7cfb\u6211\u4eec\u7684\u4e1a\u52a1\u53d1\u5c55\u56e2\u961f\u3002",

  // News page
  "news.breadcrumb": "\u65b0\u95fb",
  "news.heroTitle": "\u6700\u65b0\u65b0\u95fb\u4e0e\u66f4\u65b0",
  "news.heroDesc": "\u53ca\u65f6\u4e86\u89e3\u6211\u4eec\u7684\u6700\u65b0\u7814\u7a76\u7a81\u7834\u3001\u516c\u53f8\u516c\u544a\u548c\u884c\u4e1a\u6d1e\u5bdf\u3002",
  "news.comingSoon": "\u65b0\u95fb\u5185\u5bb9\u5373\u5c06\u63a8\u51fa...",

  // FAQ
  "faq.heading": "\u5e38\u89c1\u95ee\u9898",
  "faq.subtitle": "\u5173\u4e8e\u4e0eAngelpro\u5408\u4f5c\u7684\u5e38\u89c1\u95ee\u9898\u3002",
  "faq.q1": "Angelpro\u5982\u4f55\u4e0e\u5236\u836f\u5408\u4f5c\u4f19\u4f34\u534f\u4f5c\uff1f",
  "faq.a1": "\u6211\u4eec\u63d0\u4f9b\u7075\u6d3b\u7684\u5408\u4f5c\u6a21\u5f0f\uff0c\u5305\u62ec\u5171\u540c\u5f00\u53d1\u534f\u8bae\u3001\u670d\u52a1\u6536\u8d39\u5408\u4f5c\u548c\u6280\u672f\u8bb8\u53ef\u3002\u6211\u4eec\u7684\u56e2\u961f\u4e0e\u5408\u4f5c\u4f19\u4f34\u7684\u7814\u53d1\u56e2\u961f\u7d27\u5bc6\u5408\u4f5c\uff0c\u5c06\u6211\u4eec\u7684AI\u5e73\u53f0\u96c6\u6210\u5230\u4ed6\u4eec\u73b0\u6709\u7684\u836f\u7269\u53d1\u73b0\u5de5\u4f5c\u6d41\u7a0b\u4e2d\uff0c\u786e\u4fdd\u65e0\u7f1d\u534f\u4f5c\u548c\u6700\u5927\u5f71\u54cd\u3002",
  "faq.q2": "\u6211\u4eec\u53ef\u4ee5\u8bbf\u95eeAngelpro\u7684\u6570\u636e\u8fdb\u884c\u81ea\u5df1\u7684\u7814\u7a76\u5417\uff1f",
  "faq.a2": "\u6211\u4eec\u901a\u8fc7\u5408\u4f5c\u534f\u8bae\u63d0\u4f9b\u6570\u636e\u8bbf\u95ee\u3002\u6839\u636e\u5408\u4f5c\u6a21\u5f0f\u7684\u4e0d\u540c\uff0c\u5408\u4f5c\u4f19\u4f34\u53ef\u4ee5\u83b7\u53d6\u7b56\u5c55\u6570\u636e\u96c6\u3001\u6a21\u578b\u9884\u6d4b\u548c\u5e73\u53f0\u6d1e\u5bdf\u3002\u6240\u6709\u6570\u636e\u5171\u4eab\u5747\u53d7\u4e25\u683c\u7684\u4fdd\u5bc6\u548c\u6570\u636e\u5b89\u5168\u534f\u8bae\u7ba1\u7406\u3002",
  "faq.q3": "Angelpro\u5173\u6ce8\u54ea\u4e9b\u6cbb\u7597\u9886\u57df\uff1f",
  "faq.a3": "\u6211\u4eec\u76ee\u524d\u7684\u7ba1\u7ebf\u6db5\u76d6\u5c0f\u5206\u5b50\u3001\u591a\u80bd\u548c\u4e2d\u836f\u3002\u6211\u4eec\u7684AI\u5e73\u53f0\u4e0d\u53d7\u75be\u75c5\u9650\u5236\uff0c\u53ef\u5e94\u7528\u4e8e\u4efb\u4f55\u6cbb\u7597\u9886\u57df\u3002\u6211\u4eec\u6b63\u5728\u79ef\u6781\u63a2\u7d22\u5411\u514d\u75ab\u5b66\u3001\u4ee3\u8c22\u75be\u75c5\u548c\u4f20\u67d3\u75c5\u7684\u6269\u5c55\u3002",
  "faq.q4": "\u5982\u4f55\u7533\u8bf7Angelpro\u7684\u804c\u4f4d\uff1f",
  "faq.a4": "\u6211\u4eec\u4e00\u76f4\u5728\u5bfb\u627e\u8ba1\u7b97\u751f\u7269\u5b66\u3001\u673a\u5668\u5b66\u4e60\u3001\u836f\u7269\u5316\u5b66\u548c\u5de5\u7a0b\u9886\u57df\u7684\u4f18\u79c0\u4eba\u624d\u3002\u8bf7\u5c06\u60a8\u7684\u7b80\u5386\u548c\u7b80\u77ed\u6c42\u804c\u4fe1\u53d1\u9001\u81f3careers@Angelpro.ai\u3002\u6211\u4eec\u4e5f\u5728LinkedIn\u4e0a\u53d1\u5e03\u5f00\u653e\u804c\u4f4d\u3002",
  "faq.q5": "Angelpro\u4e0e\u5176\u4ed6AI\u836f\u7269\u53d1\u73b0\u516c\u53f8\u6709\u4ec0\u4e48\u4e0d\u540c\uff1f",
  "faq.a5": "\u6211\u4eec\u7684\u5782\u76f4\u96c6\u6210\u5e73\u53f0\u6db5\u76d6\u5c0f\u5206\u5b50\u3001\u591a\u80bd\u548c\u4e2d\u836f\u2014\u2014\u4e00\u4e2a\u5e73\u53f0\u4e09\u79cd\u6a21\u5f0f\u3002\u8fd9\u79cd\u7aef\u5230\u7aef\u7684\u65b9\u6cd5\uff0c\u7ecf\u8fc7\u6d3b\u8dc3\u4e34\u5e8a\u9879\u76ee\u7684\u9a8c\u8bc1\uff0c\u4f7f\u6211\u4eec\u6709\u522b\u4e8e\u5e02\u573a\u4e0a\u7684\u5355\u70b9\u89e3\u51b3\u65b9\u6848\u3002",
}
