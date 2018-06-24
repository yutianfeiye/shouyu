package sigmlanim.sigmlstream.interfaces;

import sigmlanim.AnimatedSign;

public abstract interface SiGMLAnimationBuildHandler
{
  public abstract void beginSignSequence();
  
  public abstract void setNextSign(AnimatedSign paramAnimatedSign);
  
  public abstract void nextSignAnimationIsDone();
  
  public abstract void endSignSequence();
}

