/*
 * SPAEventTarget.java		2008-08-25
 */
package org.csl.spa;


import org.csl.spa.SPAEvent;
import org.csl.spa.SPAEventAck;
import org.csl.spa.EventId;


/** Interface defining a target to which an {@link SPAEvent} can be
 * posted and which returns an {@link SPAEventAck} in response.
 */
public interface SPAEventTarget {

/** Posts the given event to this event target, waiting until the
 * target provides an acknowledgement, which this method returns.
 */
	SPAEventAck postEvent(SPAEvent evt);

/** Posts a new event with the given id and default values for it other
 * parameters to this event target, waiting until the
 * target provides an acknowledgement, which this method returns.
 */
	SPAEventAck postEvent(EventId eid);
}
