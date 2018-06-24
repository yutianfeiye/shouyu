package sigmlanim.sigmlstream.interfaces;

import sigmlanim.AnimatedSign;

public abstract interface StreamedSiGMLSupplierForAnimationGen
{
  public abstract AnimatedSign getNextSignToBeAnimated()
    throws InterruptedException;
  
  public abstract void putProcessedSign(AnimatedSign paramAnimatedSign);
  
  public abstract void doneSignAnimation();
}


