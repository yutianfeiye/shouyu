package sigmlanim.sigmlstream.interfaces;

public abstract interface SiGMLAnimationLoadEventHandler
{
  public abstract void animLoadStarted();
  
  public abstract void animSignLoaded(int paramInt1, int paramInt2);
  
  public abstract void animLoadDone(int paramInt1, int paramInt2);
}


